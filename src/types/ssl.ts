export interface SSLCertificate {
  issuer: string;
  validFrom: string;
  validTo: string;
  protocol: string;
  keyExchange: string;
  cipher: string;
  isValid: boolean;
  daysUntilExpiry: number;
}

export interface SSLAnalysis {
  certificate: SSLCertificate;
  securityScore: number;
  warnings: string[];
  recommendations: string[];
  securityHeaders: {
    [key: string]: {
      present: boolean;
      value?: string;
      recommendation?: string;
    };
  };
}
