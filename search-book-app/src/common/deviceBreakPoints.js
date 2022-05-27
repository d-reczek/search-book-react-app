const size = {
  mobile: "425px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1600px",
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
};
