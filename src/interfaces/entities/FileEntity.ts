export interface FileEntity {
  id: string;
  fileName: string;
  originalFileName: string;
  mimeType: string;
  refId: string // userId para backgroud e portIt para imagem no postit
  category: string; // background, postit...
  createdAt: Date;
}

// refId = userId e category = background, então será a imagem de  plano de fundo (tema)
