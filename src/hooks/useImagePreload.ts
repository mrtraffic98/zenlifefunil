import { useEffect } from 'react';
import { images } from '@/lib/imageUrls';

/**
 * Hook para precarregar imagens críticas
 * Usa link rel="preload" para melhorar o LCP
 */
export const useImagePreload = (imageUrls: string[]) => {
  useEffect(() => {
    imageUrls.forEach((src) => {
      // Verificar se já existe um preload para esta imagem
      const existingLink = document.querySelector(`link[href="${src}"]`);
      if (existingLink) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Cleanup não é necessário, mas podemos fazer se quiser
    return () => {
      // Os links podem permanecer no head para cache
    };
  }, [imageUrls]);
};

/**
 * Preload das imagens críticas do primeiro step
 */
export const useCriticalImagesPreload = () => {
  const criticalImages = [
    images.logo,
    images.age1829,
    images.age3039,
    images.age4049,
    images.age50plus,
    images.pilatesWoman,
  ];

  useImagePreload(criticalImages);
};

