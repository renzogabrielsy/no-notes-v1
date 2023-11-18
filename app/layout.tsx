import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ThemeRegistry options={{ key: "mui" }}>
      <>{children}</>
    // </ThemeRegistry>
  );
}
