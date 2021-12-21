import Link from "next/link";
import MuiLink from "@mui/material/Link";

interface LinkProps {
  href: string;
  label: string;
  color?: "textPrimary" | "textSecondary";
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "inherit"
    | undefined;
}

const CLink: React.FC<LinkProps> = ({ ...props }) => {
  return (
    <>
      <Link href={props.href} passHref>
        <MuiLink underline="hover" color={props.color} variant={props.variant} style={{ margin: "0 0.3rem" }}>
          {props.label}
        </MuiLink>
      </Link>
    </>
  );
};

export default CLink;
