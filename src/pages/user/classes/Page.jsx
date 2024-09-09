import { Helmet } from "react-helmet";
import ListStudentsPage from "../students/ListStudentsPage";

export default function ClassesPage() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Classes || infoSchoolBD</title>
      </Helmet>
      
      <ListStudentsPage />
    </>
  );
}
