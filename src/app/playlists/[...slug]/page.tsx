interface PageProps {
  params: {
    slug: string[];
  };
}

const page = ({ params }: PageProps) => {
  const [course, instructor] = params.slug;

  return (
    <div>
      <h1>{course}</h1>
      <h1>{instructor}</h1>
    </div>
  );
};

export default page;
