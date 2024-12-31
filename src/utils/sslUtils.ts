import axios from 'axios';
import type { SSLAnalysis, SSLCertificate } from '../types/ssl';

export async function analyzeSSL(url: string): Promise<SSLAnalysis> {
  try {
    // SSL Labs API'sini kullan
    const apiUrl = `https://api.ssllabs.com/api/v3/analyze?host=${encodeURIComponent(url)}&all=done`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Varsayılan değerler
    let certificate: SSLCertificate = {
      issuer: 'Unknown',
      validFrom: new Date().toISOString(),
      validTo: new Date().toISOString(),
      protocol: 'Unknown',
      keyExchange: 'Unknown',
      cipher: 'Unknown',
      isValid: false,
      daysUntilExpiry: 0
    };

    let securityScore = 0;
    const warnings: string[] = [];
    const recommendations: string[] = [];

    if (data.status === 'READY' && data.endpoints && data.endpoints.length > 0) {
      const endpoint = data.endpoints[0];
      
      // Sertifika bilgilerini al
      if (endpoint.details && endpoint.details.cert) {
        const cert = endpoint.details.cert;
        const validFrom = new Date(cert.notBefore * 1000);
        const validTo = new Date(cert.notAfter * 1000);
        const now = new Date();
        const daysUntilExpiry = Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        certificate = {
          issuer: cert.issuerSubject || 'Unknown',
          validFrom: validFrom.toISOString(),
          validTo: validTo.toISOString(),
          protocol: endpoint.details.protocols?.[0]?.name || 'Unknown',
          keyExchange: cert.keyAlg || 'Unknown',
          cipher: endpoint.details.protocols?.[0]?.cipher || 'Unknown',
          isValid: now >= validFrom && now <= validTo,
          daysUntilExpiry
        };

        // Sertifika uyarıları
        if (!certificate.isValid) {
          warnings.push('SSL certificate is not valid');
        }
        if (daysUntilExpiry < 0) {
          warnings.push('SSL certificate has expired');
        } else if (daysUntilExpiry < 30) {
          warnings.push('SSL certificate will expire soon');
          recommendations.push('Renew SSL certificate before expiration');
        }

        // Protokol uyarıları
        if (endpoint.details.protocols.some(p => p.version === '1.1')) {
          warnings.push('Using outdated TLS v1.1 protocol');
          recommendations.push('Upgrade to TLS v1.2 or higher');
        }

        // Güvenlik skoru hesaplama
        securityScore = endpoint.grade ? 
          {'A+': 100, 'A': 90, 'A-': 85, 'B': 75, 'C': 65, 'D': 55, 'E': 45, 'F': 35}[endpoint.grade] || 0 
          : 0;
      }
    }

    // Security Headers kontrolü
    const headers = {
      'Strict-Transport-Security': {
        present: false,
        recommendation: 'Add HSTS header to enforce HTTPS'
      },
      'Content-Security-Policy': {
        present: false,
        recommendation: 'Implement CSP to prevent XSS attacks'
      },
      'X-Frame-Options': {
        present: false,
        recommendation: 'Add X-Frame-Options header to prevent clickjacking'
      },
      'X-Content-Type-Options': {
        present: false,
        recommendation: 'Add X-Content-Type-Options header to prevent MIME-type sniffing'
      },
      'Referrer-Policy': {
        present: false,
        recommendation: 'Add Referrer-Policy header to control information leakage'
      }
    };

    // Her eksik header için skor düşür
    Object.values(headers).forEach(header => {
      if (!header.present) {
        securityScore = Math.max(0, securityScore - 5);
        if (header.recommendation) {
          recommendations.push(header.recommendation);
        }
      }
    });

    return {
      certificate,
      securityScore,
      warnings,
      recommendations,
      securityHeaders: headers
    };
  } catch (error) {
    console.error('SSL analysis error:', error);
    
    // Hata durumunda varsayılan değerler
    return {
      certificate: {
        issuer: 'Unknown',
        validFrom: new Date().toISOString(),
        validTo: new Date().toISOString(),
        protocol: 'Unknown',
        keyExchange: 'Unknown',
        cipher: 'Unknown',
        isValid: false,
        daysUntilExpiry: 0
      },
      securityScore: 0,
      warnings: ['Could not analyze SSL certificate'],
      recommendations: ['Check if the site has a valid SSL certificate'],
      securityHeaders: {
        'Strict-Transport-Security': { present: false },
        'Content-Security-Policy': { present: false },
        'X-Frame-Options': { present: false },
        'X-Content-Type-Options': { present: false },
        'Referrer-Policy': { present: false }
      }
    };
  }
}
