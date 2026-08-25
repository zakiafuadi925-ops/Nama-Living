import { Product, Project, ContactInfo } from '../types';
import { initialProducts, initialProjects, initialContactInfo } from '../data/initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'namaliving_products_v1',
  PROJECTS: 'namaliving_projects_v1',
  CONTACT: 'namaliving_contact_v1',
};

export const getStoredProducts = (): Product[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
      return initialProducts;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products from storage:', error);
    return initialProducts;
  }
};

export const saveStoredProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products:', error);
  }
};

export const getStoredProjects = (): Project[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
      return initialProjects;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects from storage:', error);
    return initialProjects;
  }
};

export const saveStoredProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects:', error);
  }
};

export const getStoredContact = (): ContactInfo => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CONTACT);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(initialContactInfo));
      return initialContactInfo;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contact from storage:', error);
    return initialContactInfo;
  }
};

export const saveStoredContact = (contact: ContactInfo): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(contact));
  } catch (error) {
    console.error('Error saving contact info:', error);
  }
};

export const resetToDefaultData = (): void => {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
  localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(initialContactInfo));
};

export const formatCurrencyIDR = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
};
