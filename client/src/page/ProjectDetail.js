import { useParams } from 'react-router-dom';

function ProjectDetail() {
  const { id } = useParams(); // Access the id parameter from the URL

  return <div>Project ID: {id}</div>;
}

export default ProjectDetail;