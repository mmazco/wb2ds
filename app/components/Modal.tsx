"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          maxWidth: "700px",
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e5e5",
          padding: "20px 24px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}>
          <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
            Understanding World ID Utility and Rewards
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              color: "#888",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
            }}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "24px" }}>
          {/* What This Chart Shows */}
          <section style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a", marginBottom: "12px" }}>
              What This Chart Shows
            </h3>
            <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6, marginBottom: "12px" }}>
              <strong style={{ color: "#1a1a1a" }}>Core thesis:</strong> This matrix roughly maps every World Build app based on two critical dimensions: how much World ID utility they provide, and how dependent they are on token rewards to drive user engagement. Since Mini Apps are providing returning users to World Wallet App beyond just claiming WLD, this thesis piggy backs off of that realisation and questions if token rewards or if little to none financial rewards is provided, would users still come back? as the ultimate test to gauge what apps will drive long term retention.
            </p>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
              Note: the mapping and thesis are assumptions based on World ecosystem observation and data on user behaviour, and the type of products/ideas presented during demo day in Buenos Aires for WB2.
            </p>
          </section>

          {/* The Axes */}
          <section style={{ marginBottom: "24px" }}>
            <div style={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "12px",
            }}>
              <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", marginBottom: "8px" }}>
                Y-Axis: World ID Utilization (Low → High)
              </h4>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.5, margin: 0 }}>
                How deeply does the app leverage World ID&apos;s proof of personhood? Apps at the top use sybil resistance as their core moat. Apps at the bottom could exist on any platform.
              </p>
            </div>
            
            <div style={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              padding: "16px",
            }}>
              <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", marginBottom: "8px" }}>
                X-Axis: Rewards Dependence (Low → High)
              </h4>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.5, margin: 0 }}>
                How much does the app rely on token or rewards incentives to drive engagement?
              </p>
            </div>
          </section>

          {/* Why World ID Matters for Retention */}
          <section style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a", marginBottom: "12px" }}>
              Why World ID Matters for Retention
            </h3>
            <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6, marginBottom: "12px" }}>
              <strong style={{ color: "#1a1a1a" }}>The retention hypothesis:</strong> Apps that deeply integrate World ID create sustainable moats that transcend token rewards. Here&apos;s why:
            </p>
            <ul style={{ fontSize: "13px", color: "#666", lineHeight: 1.7, margin: 0, paddingLeft: "20px" }}>
              <li style={{ marginBottom: "8px" }}><strong style={{ color: "#1a1a1a" }}>Sybil resistance enables new markets:</strong> Verified human attention (MADS), trust-based lending (Rick), and geo-verified polling (Ground Truth) are only viable with proof of personhood.</li>
              <li style={{ marginBottom: "8px" }}><strong style={{ color: "#1a1a1a" }}>Quality over quantity:</strong> One verified human is worth 1000 bot accounts. Apps leveraging this insight can charge premium prices and deliver superior value.</li>
              <li style={{ marginBottom: "8px" }}><strong style={{ color: "#1a1a1a" }}>Network effects multiply:</strong> When every user is a verified unique human, the network becomes exponentially more valuable (fraud-proof marketplaces, real community governance, accurate sentiment data).</li>
              <li><strong style={{ color: "#1a1a1a" }}>Beyond token incentives:</strong> While rewards attract users initially, World ID integration creates structural advantages that persist even as rewards decrease.</li>
            </ul>
          </section>

          {/* Use Cases That Drive World ID Adoption */}
          <section style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a", marginBottom: "12px" }}>
              Use Cases That Drive World ID Adoption
            </h3>
            <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6, marginBottom: "12px" }}>
              Based on proof-of-human business applications, World ID solves critical problems:
            </p>
            <ul style={{ fontSize: "13px", color: "#666", lineHeight: 1.7, margin: 0, paddingLeft: "20px" }}>
              <li style={{ marginBottom: "8px" }}><strong style={{ color: "#1a1a1a" }}>Fraud prevention:</strong> No bot farms, no multi-accounting, no identity theft (Human Labs, MADS, Rick)</li>
              <li style={{ marginBottom: "8px" }}><strong style={{ color: "#1a1a1a" }}>Fair distribution:</strong> Airdrops, rewards, and voting that can&apos;t be gamed (Ground Truth, TBD)</li>
              <li style={{ marginBottom: "8px" }}><strong style={{ color: "#1a1a1a" }}>Verified data:</strong> Real human sentiment, preferences, and behavior data worth premium prices (Valor, Fram3s, Ground Truth)</li>
              <li><strong style={{ color: "#1a1a1a" }}>Trust-based transactions:</strong> Enable P2P lending, reputation systems, and community governance (Rick, Innermost, PumPool)</li>
            </ul>
          </section>

          {/* The Strategic Question */}
          <section>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a", marginBottom: "12px" }}>
              The Strategic Question
            </h3>
            <p style={{ fontSize: "14px", color: "#1a1a1a", fontWeight: 500, marginBottom: "12px" }}>
              Does your app actually need World ID?
            </p>
            <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6, marginBottom: "12px" }}>
              The assumption here is that apps in the top half of this chart have identified use cases where proof of personhood creates genuine competitive advantages. These apps could:
            </p>
            <ul style={{ fontSize: "13px", color: "#666", lineHeight: 1.7, margin: 0, paddingLeft: "20px" }}>
              <li style={{ marginBottom: "8px" }}>Sustain growth as token rewards normalize</li>
              <li style={{ marginBottom: "8px" }}>Command premium pricing from users or businesses</li>
              <li style={{ marginBottom: "8px" }}>Build defensible moats competitors can&apos;t replicate</li>
              <li>Justify World&apos;s investment in building proof-of-human infrastructure</li>
            </ul>
          </section>

          {/* Disclaimer */}
          <div style={{ 
            marginTop: "24px", 
            paddingTop: "16px", 
            borderTop: "1px solid #e5e5e5",
          }}>
            <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>
              Disclaimer: The above thesis and assumptions is made by builder and mentor @mmazco and not expressed by an official member of TFH or World Foundation.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
