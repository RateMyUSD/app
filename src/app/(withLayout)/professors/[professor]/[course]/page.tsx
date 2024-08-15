export default function Page({
  params,
}: Readonly<{ params: { professor: string; course: string } }>) {
  return (
    <div>
      {params.professor} - {params.course}
    </div>
  );
}
