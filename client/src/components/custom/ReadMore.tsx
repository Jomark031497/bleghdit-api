import { useState } from "react";
import { Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
interface Props {
  text: string;
  link: string;
}

const ReadMore: React.FC<Props> = ({ text, link }) => {
  const router = useRouter();
  const [isReadMore, setIsReadMore] = useState(true);
  const MAX_CHAR = 260;
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
      {text.length > MAX_CHAR ? (
        <>
          <span onClick={() => router.push(link)}>{isReadMore ? text.slice(0, MAX_CHAR) : text}</span>
          <span onClick={toggleReadMore}>{isReadMore ? <Button>Read More</Button> : <Button>Show Less</Button>}</span>
        </>
      ) : (
        <span onClick={() => router.push(link)}>{text}</span>
      )}
    </Typography>
  );
};

export default ReadMore;
