
'use client'

import React, { Suspense, lazy, Component, ErrorInfo, ReactNode } from 'react'

// Error Boundary to catch fetch/load errors for the Spline component
class SplineErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Spline Load Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Explicitly type the lazy-loaded component to resolve the 'IntrinsicAttributes' error.
const Spline = lazy(() => 
  import('@splinetool/react-spline').then(module => {
    // Handling different module export patterns (default vs named)
    const component = (module.default || (module as any).Spline || module) as React.ComponentType<{ scene: string; className?: string }>;
    return { default: component };
  }).catch(err => {
    console.error("Dynamic import for Spline failed:", err);
    throw err;
  })
);

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const fallbackUI = (
    <div className="w-full h-full flex items-center justify-center bg-black/40 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-30 animate-pulse"></div>
      <div className="relative z-10 text-center">
        <i className="fas fa-cube text-4xl text-white/20 mb-4 block group-hover:scale-110 transition-transform"></i>
        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Interactive Component Ready</span>
      </div>
    </div>
  );

  return (
    <SplineErrorBoundary fallback={fallbackUI}>
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className}
        />
      </Suspense>
    </SplineErrorBoundary>
  )
}
