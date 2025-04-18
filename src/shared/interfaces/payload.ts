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
