import dynamic from 'next/dynamic';

const DynamicPDFViewer = dynamic(() => import('../components/PDFViewer'), {
  loading: () => <p>Loading...</p>,
});

export default function PDFViewer({ title }: { title: string }) {
  return <DynamicPDFViewer experienceTitle={title} />;
}
