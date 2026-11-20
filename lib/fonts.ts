import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
export const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
// Preloaded like the other two: the AOG bar and the hero badges set mono labels at
// the very top of every page, so loading it late delays first paint.
export const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const fontVariables = `${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`;
