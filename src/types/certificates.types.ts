export interface Certificate {
 id: string;
 userId: string;
 courseId: string;
 title: string;
 issuedAt: string;
 credentialId: string;
 pdfUrl: string;
}

export interface VerifiedCertificate {
 valid: boolean;

 certificate: {
 title: string;
 userName: string;
 issuedAt: string;
 credentialId: string;
 };
}