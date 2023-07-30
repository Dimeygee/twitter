
import { Provider } from "./providers"



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Provider>
        <body>{children}</body>
      </Provider>
    </html>
  )
}
