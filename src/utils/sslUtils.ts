import axios from 'axios';
import type { SSLAnalysis, SSLCertificate } from '../types/ssl';

export async function checkSSL(url: string): Promise<{ valid: boolean; issuer: string; validFrom: string; validTo: string }> {
  try {
    const response = await axios.get(url);
    const cert = response.request.socket.getPeerCertificate();
    return {
      valid: cert.valid_from && cert.valid_to ? true : false,
      issuer: cert.issuer ? cert.issuer.O : 'Unknown',
      validFrom: cert.valid_from || 'Unknown',
      validTo: cert.valid_to || 'Unknown',
    };
  } catch (error) {
    console.error('SSL check failed:', error);
    return {
      valid: false,
      issuer: 'Unknown',
      validFrom: 'Unknown',
      validTo: 'Unknown',
    };
  }
}

export async function analyzeSSL(url: string): Promise<SSLAnalysis> {
  try {
    // Bu fonksiyon gerçek bir SSL analizi yapacak şekilde güncellenebilir
    // Şu an örnek veri döndürüyor
    const certificate: SSLCertificate = {
      issuer: "Let's Encrypt Authority X3",
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
      protocol: 'TLS 1.3',
      keyExchange: 'ECDHE',
      cipher: 'AES_256_GCM',
      isValid: true,
      daysUntilExpiry: 90
    };

    const securityHeaders = {
      'Strict-Transport-Security': {
        present: true,
        value: 'max-age=31536000; includeSubDomains',
      },
      'Content-Security-Policy': {
        present: false,
        recommendation: 'Implement CSP to prevent XSS attacks'
      },
      'X-Frame-Options': {
        present: true,
        value: 'DENY'
      },
      'X-Content-Type-Options': {
        present: true,
        value: 'nosniff'
      },
      'Referrer-Policy': {
        present: false,
        recommendation: 'Add Referrer-Policy header to control information leakage'
      }
    };

    const warnings = [];
    const recommendations = [];

    // Sertifika kontrolü
    if (certificate.daysUntilExpiry < 30) {
      warnings.push('SSL certificate will expire soon');
      recommendations.push('Renew SSL certificate before expiration');
    }

    // Güvenlik başlıkları kontrolü
    if (!securityHeaders['Content-Security-Policy'].present) {
      warnings.push('Content Security Policy (CSP) is not implemented');
    }

    if (!securityHeaders['Referrer-Policy'].present) {
      recommendations.push('Implement Referrer-Policy header');
    }

    // Güvenlik skoru hesaplama
    let securityScore = 100;
    
    // Her eksik güvenlik başlığı için -10 puan
    Object.values(securityHeaders).forEach(header => {
      if (!header.present) securityScore -= 10;
    });

    // Sertifika süresine göre puan
    if (certificate.daysUntilExpiry < 30) securityScore -= 20;
    else if (certificate.daysUntilExpiry < 60) securityScore -= 10;

    return {
      certificate,
      securityScore,
      warnings,
      recommendations,
      securityHeaders
    };
  } catch (error) {
    throw new Error('SSL analysis failed');
  }
}
