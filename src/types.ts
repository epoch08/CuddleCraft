export type Size = {
  label: string;
  value: 'small' | 'medium' | 'large'| 'xl';
  price: number;
};

export type Service = {
  label: string;
  value: 'template' | 'designer' | 'upload';
  price: number;
};

export type Color = {
  name: string;
  value: string;
};

export type Material = {
  name: string;
  value: string;
  description: string;
  price: number;
};

export type Accessory = {
  id: string;
  name: string;
  price: number;
  icon: string;
};

export type Template = {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
};

export type CustomizerState = {
  selectedSize: Size;
  selectedService: Service;
  selectedColor: Color;
  selectedMaterial: Material;
  selectedAccessories: Accessory[];
  selectedTemplate: Template | null;
  uploadedImage: string | null;
  totalPrice: number;
};