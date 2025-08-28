import "./globals.css";
import Providers from "./providers"; 

export const metadata = {
  title: "ProductHub",
  description: "Manage and browse products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
