import { useState } from "react";
import { Typography, Button } from "@mui/material";
interface Props {
  text: string;
}

const ReadMore: React.FC<Props> = ({ text }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const MAX_CHAR = 260;
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
      {text.length > MAX_CHAR ? (
        <>
          {isReadMore ? text.slice(0, MAX_CHAR) : text}
          <span onClick={toggleReadMore}>{isReadMore ? <Button>Read More</Button> : <Button>Show Less</Button>}</span>
        </>
      ) : (
        text
      )}
    </Typography>
  );
};

export default ReadMore;
