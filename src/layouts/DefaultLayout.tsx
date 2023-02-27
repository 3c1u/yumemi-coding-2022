import { AppFooter } from '~/components/organisms/AppFooter'
import { AppHeader } from '~/components/organisms/AppHeader'

interface DefaultLayoutProps {
  children?: React.ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div>
      <AppHeader />
      <main>{children}</main>
      <AppFooter />
    </div>
  )
}
