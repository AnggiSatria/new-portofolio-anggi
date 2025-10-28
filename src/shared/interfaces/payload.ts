// Project

export interface IRequestPostPutProject {
  title?: string;
  description?: string;
  image?: string;
  link?: string;
}

export interface IResponseGetProject {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRequestDeleteResponse {
  message: string;
}

// Skill

export interface IResponseGetSkill {
  id: string;
  image: string; // base64 encoded image string
  createdAt: Date; // or string
  updatedAt: Date; // or string
}

export interface IRequestPostSkill {
  image: string; // base64 encoded image
}

export interface IRequestDeleteSkill {
  id: string;
}

// Experience

export interface IResponseGetExperience {
  id: string;
  title: string;
  company: string;
  startDate: Date; // or string if you prefer handling as string
  endDate?: Date; // optional, can be null or undefined
  description: string;
  createdAt: Date; // or string depending on how you handle date in your app
  updatedAt: Date; // or string
}

// Experience

export interface IRequestPostPutExperience {
  title?: string;
  company?: string;
  startDate?: string; // ISO string preferred, easier to handle in fetch
  endDate?: string | null;
  description?: string;
}

export interface IRequestDeleteExperience {
  id: string;
}

export interface IRequestDeleteResponse {
  message: string;
}

// 📚 EDUCATION INTERFACES
// ======================================================

// GET - Response
export interface IResponseGetEducationGet {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string; // ISO Date string
  endDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

// POST - Request
export interface IRequestEducationPost {
  institution: string;
  degree: string;
  field: string;
  startDate: string; // ISO Date string
  endDate?: string | null;
}

// PUT - Request
export interface IRequestEducationPut {
  id: string;
  institution?: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string | null;
}

// DELETE - Response
export interface IResponseEducationDelete {
  message: string;
  deletedId: string;
}

// ======================================================
// 🎓 CERTIFICATE INTERFACES
// ======================================================

// GET - Response
export interface IResponseGetCertificateGet {
  id: string;
  title: string;
  issuer: string;
  issueDate: string; // ISO Date string
  image: string;
  createdAt: string;
  updatedAt: string;
}

// POST - Request
export interface IRequestCertificatePost {
  title: string;
  issuer: string;
  issueDate: string;
  image: string;
}

// PUT - Request
export interface IRequestCertificatePut {
  id: string;
  title?: string;
  issuer?: string;
  issueDate?: string;
  image?: string;
}

// DELETE - Response
export interface IResponseCertificateDelete {
  message: string;
  deletedId: string;
}

export interface IPaginationMeta {
  total: number;
  page: number;
  perPage: number;
}

export interface IResponseGetEducationList {
  data: IResponseGetEducationGet[];
  meta: IPaginationMeta;
}

// ===============================================
// 🎓 CERTIFICATE INTERFACES
// ===============================================

// GET - Response
export interface IResponseGetCertificateGet {
  id: string;
  title: string;
  issuer: string;
  issueDate: string; // ISO format date
  image: string;
  createdAt: string;
  updatedAt: string;
}

// GET (List) - Response
export interface IResponseGetCertificateList {
  data: IResponseGetCertificateGet[];
  message?: string;
  total?: number;
}

// POST - Request
export interface IRequestCertificatePost {
  title: string;
  issuer: string;
  issueDate: string;
  image: string;
}

// POST - Response
export interface IResponseCertificatePost {
  message: string;
  data: IResponseGetCertificateGet;
}

// PUT - Request
export interface IRequestCertificatePut {
  id: string;
  title?: string;
  issuer?: string;
  issueDate?: string;
  image?: string;
}

// PUT - Response
export interface IResponseCertificatePut {
  message: string;
  data: IResponseGetCertificateGet;
}

// DELETE - Response
export interface IResponseCertificateDelete {
  message: string;
  deletedId: string;
}
