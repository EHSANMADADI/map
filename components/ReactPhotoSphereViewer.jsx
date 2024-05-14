'use client'
import dynamic from 'next/dynamic';
// import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
const ReactPhotoSphereViewer = dynamic(
  () =>
    import('react-photo-sphere-viewer').then(
      (mod) => mod.ReactPhotoSphereViewer
    ),
  {
    ssr: false,
  }
);
export default ReactPhotoSphereViewer