/**
 * @file config.styles.ts
 * @description Stylesheet Configuration.
 */

/**
 * Represents the global styles configuration.
 *
 * @property {Object} colors - The colors used in the application.
 * @property {string} colors.default_color_1 - The first default color.
 * @property {string} colors.default_color_2 - The second default color.
 * @property {string} colors.default_background_dark - The default dark background color.
 * @property {string} colors.default_background_light - The default light background color.
 * @property {string} colors.default_low_contrast - The default low contrast color.
 * @property {string} colors.default_font - The default font color.
 * @property {string} colors.default_font_subtitle - The default subtitle font color.
 * @property {string} colors.green_alert - The green alert color.
 * @property {string} colors.yellow_alert - The yellow alert color.
 * @property {string} colors.red_alert - The red alert color.
 * @property {string} colors.black - The black color.
 *
 * @property {Object} fontFamily - The font family used in the application.
 * @property {string} fontFamily.default - The default font family.
 * @property {string} fontFamily.title - The title font family.
 *
 * @property {Object} fontSize - The font size used in the application.
 * @property {number} fontSize.title_icon - The title icon font size.
 * @property {number} fontSize.huge_title - The huge title font size.
 * @property {number} fontSize.title - The title font size.
 * @property {number} fontSize.subtitle - The subtitle font size.
 * @property {number} fontSize.big_regular - The big regular font size.
 * @property {number} fontSize.regular - The regular font size.
 * @property {number} fontSize.small - The small font size.
 */
export const stylesConfig = {
  colors: {
    default_color_1: "#b442d7",
    default_color_2: "#fc9d7a",
    default_background_dark: "#101010",
    default_background_light: "#2b2b36",
    default_low_contrast: "#242424",
    default_font: "#fdfdfd",
    default_font_subtitle: "#ababab",
    green_alert: "#19bd4d",
    yellow_alert: "#ebdb2a",
    red_alert: "#ed4545",
    black: "#000000",
  },
  fontFamily: {
    default: "Montserrat_500Medium",
    title: "Poppins_600SemiBold",
  },
  fontSize: {
    title_icon: 60,
    huge_title: 40,
    title: 34,
    subtitle: 26,
    big_regular: 22,
    regular: 15,
    small: 13,
  },
};
