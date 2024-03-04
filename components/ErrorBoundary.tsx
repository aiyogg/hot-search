"use client"

import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode
  fallback: React.ReactNode
}

export default class ErrorBoundary extends React.PureComponent<ErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
