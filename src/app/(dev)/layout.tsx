const DevLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-[url('/images/bg_dummy.png')]">
      {children}
    </main>
  );
};

export default DevLayout;
