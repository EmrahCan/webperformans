import axios from 'axios';
import type { SSLAnalysis, SSLCertificate } from '../types/ssl';
import { Agent } from 'https';

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
    // HTTPS agent oluştur
    const agent = new Agent({
      rejectUnauthorized: false // Self-signed sertifikaları da kontrol edebilmek için
    });

    // URL'yi HTTPS protokolüne çevir
    if (!url.startsWith('http')) {
      url = 'https://' + url;
    }

    // SSL sertifikasını kontrol et
    const response = await axios.get(url, {
      httpsAgent: agent,
      timeout: 5000
    });

    const socket = response.request.res.socket;
    if (!socket) {
      throw new Error('Could not get socket information');
    }

    const cert = socket.getPeerCertificate(true);
    const protocol = socket.getProtocol();

    // Sertifika bilgilerini hazırla
    const validFrom = new Date(cert.valid_from);
    const validTo = new Date(cert.valid_to);
    const now = new Date();
    const daysUntilExpiry = Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    const certificate: SSLCertificate = {
      issuer: cert.issuer?.O || cert.issuer?.CN || 'Unknown',
      validFrom: validFrom.toISOString(),
      validTo: validTo.toISOString(),
      protocol: protocol || 'Unknown',
      keyExchange: cert.ephemeralKeyInfo?.name || 'Unknown',
      cipher: socket.getCipher().name || 'Unknown',
      isValid: now >= validFrom && now <= validTo,
      daysUntilExpiry
    };

    // Security Headers kontrolü
    const headers = response.headers;
    const securityHeaders = {
      'Strict-Transport-Security': {
        present: !!headers['strict-transport-security'],
        value: headers['strict-transport-security'],
        recommendation: !headers['strict-transport-security'] ? 
          'Add HSTS header to enforce HTTPS' : undefined
      },
      'Content-Security-Policy': {
        present: !!headers['content-security-policy'],
        value: headers['content-security-policy'],
        recommendation: !headers['content-security-policy'] ?
          'Implement CSP to prevent XSS attacks' : undefined
      },
      'X-Frame-Options': {
        present: !!headers['x-frame-options'],
        value: headers['x-frame-options'],
        recommendation: !headers['x-frame-options'] ?
          'Add X-Frame-Options header to prevent clickjacking' : undefined
      },
      'X-Content-Type-Options': {
        present: !!headers['x-content-type-options'],
        value: headers['x-content-type-options'],
        recommendation: !headers['x-content-type-options'] ?
          'Add X-Content-Type-Options header to prevent MIME-type sniffing' : undefined
      },
      'Referrer-Policy': {
        present: !!headers['referrer-policy'],
        value: headers['referrer-policy'],
        recommendation: !headers['referrer-policy'] ?
          'Add Referrer-Policy header to control information leakage' : undefined
      }
    };

    const warnings: string[] = [];
    const recommendations: string[] = [];

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
    if (protocol && protocol.includes('TLSv1.1')) {
      warnings.push('Using outdated TLS v1.1 protocol');
      recommendations.push('Upgrade to TLS v1.2 or higher');
    }

    // Güvenlik başlıkları önerileri
    Object.entries(securityHeaders).forEach(([header, info]) => {
      if (!info.present && info.recommendation) {
        recommendations.push(info.recommendation);
      }
    });

    // Güvenlik skoru hesaplama
    let securityScore = 100;

    // Sertifika durumuna göre puan
    if (!certificate.isValid) securityScore -= 40;
    if (daysUntilExpiry < 0) securityScore -= 40;
    else if (daysUntilExpiry < 30) securityScore -= 20;
    else if (daysUntilExpiry < 60) securityScore -= 10;

    // Protokol versiyonuna göre puan
    if (protocol && protocol.includes('TLSv1.1')) securityScore -= 20;
    else if (protocol && protocol.includes('TLSv1.2')) securityScore -= 5;

    // Güvenlik başlıkları için puan
    Object.values(securityHeaders).forEach(header => {
      if (!header.present) securityScore -= 10;
    });

    // Minimum 0 puan
    securityScore = Math.max(0, securityScore);

    return {
      certificate,
      securityScore,
      warnings,
      recommendations,
      securityHeaders
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
