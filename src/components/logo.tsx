import { forwardRef } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import RouterLink from "../routes/components/router-link";

// ----------------------------------------------------------------------
interface LogoProps {
  disabledLink?: boolean;
  sx?: object;
}
const Logo = forwardRef(
  ({ disabledLink = false, sx, ...other }: LogoProps, ref) => {
    const theme = useTheme();

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: "inline-flex",
          ...sx,
        }}
        {...other}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* svg of LV*/}
          <path
            d="M120 0C53.7 0 0 53.7 0 120s53.7 120 120 120 120-53.7 120-120S186.3 0 120 0zm0 40c52.9 0 80.1 63.9 80.1 80.1 0 16.2-13.2 29.9-29.9 29.9-16.2 0-29.9-13.2-29.9-29.9 0-16.2 27.2-80.1 80.1-80.1zM80 160c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm40 0c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm40 0c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z"
            fill={PRIMARY_MAIN}
          />
        </svg>
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: "contents" }}>
        {logo}
      </Link>
    );
  }
);

Logo.displayName = "Logo";

export default Logo;
