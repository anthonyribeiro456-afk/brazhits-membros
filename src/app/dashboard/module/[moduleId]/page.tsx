import ModuleContent from './module-content';

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  return <ModuleContent moduleId={params.moduleId} />;
}
