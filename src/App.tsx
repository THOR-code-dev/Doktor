import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ToastProvider } from '@/components/ui/toast'
import { Layout } from '@/components/layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import {
  HomePage,
  TreatmentsPage,
  TreatmentDetailPage,
  BlogPage,
  BlogDetailPage,
  ContactPage,
  LocationPage,
  AppointmentPage,
  AboutPage,
} from '@/pages'
import {
  AdminLoginPage,
  AdminDashboardPage,
  AdminBlogListPage,
  AdminBlogEditorPage,
  AdminTreatmentListPage,
  AdminTreatmentEditorPage,
  AdminSettingsPage,
  AdminLayout,
} from '@/pages/admin'

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route element={<Layout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tedaviler" element={<TreatmentsPage />} />
                  <Route path="/tedaviler/:slug" element={<TreatmentDetailPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogDetailPage />} />
                  <Route path="/iletisim" element={<ContactPage />} />
                  <Route path="/konum" element={<LocationPage />} />
                  <Route path="/randevu" element={<AppointmentPage />} />
                  <Route path="/ozgecmis" element={<AboutPage />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="blog" element={<AdminBlogListPage />} />
                  <Route path="blog/:id" element={<AdminBlogEditorPage />} />
                  <Route path="tedaviler" element={<AdminTreatmentListPage />} />
                  <Route path="tedaviler/:id" element={<AdminTreatmentEditorPage />} />
                  <Route path="ayarlar" element={<AdminSettingsPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
