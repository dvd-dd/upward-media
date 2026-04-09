export default function PortfolioProject({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20">
      <h1 className="text-4xl font-clash font-bold text-white">
        Projeto: {params.slug}
      </h1>
    </section>
  );
}
