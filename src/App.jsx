import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onReset={() => window.location.reload()}
    >
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;