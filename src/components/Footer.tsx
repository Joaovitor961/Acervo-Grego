export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container d-flex justify-content-between align-items-center">
        <small>© {new Date().getFullYear()} Acervo Grego</small>
        <div>
          <a className="text-light me-2" href="https://thegreekmythapi.vercel.app/" target="_blank" rel="noreferrer">API</a>
          <a className="text-light" href="https://github.com/Joaovitor961/Acervo-Grego" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
