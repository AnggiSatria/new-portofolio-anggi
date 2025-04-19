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
