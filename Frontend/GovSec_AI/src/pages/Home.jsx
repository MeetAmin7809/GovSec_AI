import React, { useState, useEffect } from "react";
import {
	Shield,
	Brain,
	Users,
	TrendingUp,
	Eye,
	Globe,
	ChevronRight,
	Play,
	CheckCircle,
	AlertTriangle,
	BarChart3,
	MessageSquare,
	Lock,
	Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
	const [activeFeature, setActiveFeature] = useState(0);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
		const interval = setInterval(() => {
			setActiveFeature((prev) => (prev + 1) % 6);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const features = [
		{
			icon: <MessageSquare size={32} />,
			title: "Citizen Complaint Analysis",
			description:
				"AI-powered NLP automatically categorizes and prioritizes citizen complaints",
			color: "linear-gradient(135deg, #3b82f6, #06b6d4)",
		},
		{
			icon: <BarChart3 size={32} />,
			title: "Budget & Scheme Analysis",
			description:
				"Correlate spending patterns with outcomes to optimize resource allocation",
			color: "linear-gradient(135deg, #10b981, #059669)",
		},
		{
			icon: <AlertTriangle size={32} />,
			title: "Fraud & Anomaly Detection",
			description:
				"Advanced ML algorithms detect suspicious activities and prevent misuse",
			color: "linear-gradient(135deg, #ef4444, #ec4899)",
		},
		{
			icon: <Brain size={32} />,
			title: "Policy Recommendation Engine",
			description:
				"Simulate policy impacts before implementation using reinforcement learning",
			color: "linear-gradient(135deg, #8b5cf6, #6366f1)",
		},
		{
			icon: <TrendingUp size={32} />,
			title: "Sentiment Analysis",
			description:
				"Monitor public mood and detect misinformation campaigns across social media",
			color: "linear-gradient(135deg, #f59e0b, #eab308)",
		},
		{
			icon: <Lock size={32} />,
			title: "Security & Transparency",
			description: "Blockchain-based audit trails with zero trust architecture",
			color: "linear-gradient(135deg, #4b5563, #374151)",
		},
	];

	const stats = [
		{
			label: "Complaint Resolution",
			value: "85%",
			description: "Faster processing",
		},
		{ label: "Fraud Detection", value: "92%", description: "Accuracy rate" },
		{
			label: "Policy Impact",
			value: "78%",
			description: "Prediction accuracy",
		},
		{ label: "Citizen Trust", value: "67%", description: "Improvement" },
	];

	const styles = {
		container: {
			minHeight: "100vh",
			background: "linear-gradient(135deg, #0f172a, #581c87, #0f172a)",
			color: "white",
			overflow: "hidden",
			fontFamily: "system-ui, -apple-system, sans-serif",
		},
		backgroundElements: {
			position: "fixed",
			inset: "0",
			overflow: "hidden",
			pointerEvents: "none",
			zIndex: 0,
		},
		bgCircle1: {
			position: "absolute",
			top: "-160px",
			right: "-160px",
			width: "320px",
			height: "320px",
			background: "rgba(139, 92, 246, 0.1)",
			borderRadius: "50%",
			filter: "blur(80px)",
			animation: "pulse 4s infinite",
		},
		bgCircle2: {
			position: "absolute",
			bottom: "-160px",
			left: "-160px",
			width: "320px",
			height: "320px",
			background: "rgba(59, 130, 246, 0.1)",
			borderRadius: "50%",
			filter: "blur(80px)",
			animation: "pulse 4s infinite 1s",
		},
		bgCircle3: {
			position: "absolute",
			top: "50%",
			left: "50%",
			width: "240px",
			height: "240px",
			background: "rgba(6, 182, 212, 0.05)",
			borderRadius: "50%",
			filter: "blur(80px)",
			animation: "ping 6s infinite 2s",
			transform: "translate(-50%, -50%)",
		},
		nav: {
			position: "relative",
			zIndex: 50,
			padding: "16px 24px",
			background: "rgba(0, 0, 0, 0.2)",
			backdropFilter: "blur(10px)",
			borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
		},
		navContent: {
			maxWidth: "1280px",
			margin: "0 auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
		},
		logo: {
			display: "flex",
			alignItems: "center",
			gap: "12px",
		},
		logoIcon: {
			width: "40px",
			height: "40px",
			background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
			borderRadius: "8px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		logoText: {
			fontSize: "24px",
			fontWeight: "bold",
			background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
			WebkitBackgroundClip: "text",
			WebkitTextFillColor: "transparent",
			backgroundClip: "text",
		},
		navLinks: {
			display: "flex",
			alignItems: "center",
			gap: "32px",
		},
		navLink: {
			color: "white",
			textDecoration: "none",
			transition: "color 0.3s",
			cursor: "pointer",
		},
		ctaButton: {
			background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
			padding: "8px 24px",
			borderRadius: "50px",
			border: "none",
			color: "white",
			fontWeight: "600",
			cursor: "pointer",
			transition: "all 0.3s",
			boxShadow: "0 4px 15px rgba(6, 182, 212, 0.3)",
		},
		hero: {
			position: "relative",
			zIndex: 10,
			padding: "80px 24px",
			textAlign: "center",
		},
		heroContent: {
			maxWidth: "1280px",
			margin: "0 auto",
			transform: isVisible ? "translateY(0)" : "translateY(40px)",
			opacity: isVisible ? 1 : 0,
			transition: "all 1s ease-out",
		},
		heroTitle: {
			fontSize: "4rem",
			fontWeight: "bold",
			marginBottom: "32px",
			lineHeight: 1.1,
		},
		heroTitleGradient: {
			background: "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)",
			WebkitBackgroundClip: "text",
			WebkitTextFillColor: "transparent",
			backgroundClip: "text",
		},
		heroSubtitle: {
			fontSize: "20px",
			color: "#d1d5db",
			marginBottom: "48px",
			maxWidth: "800px",
			margin: "0 auto 48px auto",
			lineHeight: 1.6,
		},
		heroButtons: {
			display: "flex",
			gap: "24px",
			justifyContent: "center",
			alignItems: "center",
			flexWrap: "wrap",
		},
		primaryButton: {
			display: "flex",
			alignItems: "center",
			gap: "8px",
			background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
			padding: "16px 32px",
			borderRadius: "50px",
			border: "none",
			color: "white",
			fontSize: "18px",
			fontWeight: "600",
			cursor: "pointer",
			transition: "all 0.3s",
			boxShadow: "0 10px 25px rgba(6, 182, 212, 0.3)",
		},
		secondaryButton: {
			padding: "16px 32px",
			borderRadius: "50px",
			border: "2px solid rgba(255, 255, 255, 0.2)",
			background: "transparent",
			color: "white",
			fontSize: "18px",
			fontWeight: "600",
			cursor: "pointer",
			transition: "all 0.3s",
			backdropFilter: "blur(10px)",
		},
		statsSection: {
			position: "relative",
			zIndex: 10,
			padding: "64px 24px",
			maxWidth: "1280px",
			margin: "0 auto",
		},
		statsGrid: {
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
			gap: "32px",
		},
		statCard: {
			textAlign: "center",
			background: "rgba(255, 255, 255, 0.05)",
			backdropFilter: "blur(10px)",
			borderRadius: "16px",
			padding: "24px",
			border: "1px solid rgba(255, 255, 255, 0.1)",
			transition: "all 0.3s",
		},
		statValue: {
			fontSize: "36px",
			fontWeight: "bold",
			background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
			WebkitBackgroundClip: "text",
			WebkitTextFillColor: "transparent",
			backgroundClip: "text",
			marginBottom: "8px",
		},
		featuresSection: {
			position: "relative",
			zIndex: 10,
			padding: "80px 24px",
			maxWidth: "1280px",
			margin: "0 auto",
		},
		sectionTitle: {
			textAlign: "center",
			marginBottom: "64px",
		},
		sectionTitleText: {
			fontSize: "48px",
			fontWeight: "bold",
			marginBottom: "24px",
			background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
			WebkitBackgroundClip: "text",
			WebkitTextFillColor: "transparent",
			backgroundClip: "text",
		},
		sectionSubtitle: {
			fontSize: "20px",
			color: "#d1d5db",
			maxWidth: "600px",
			margin: "0 auto",
		},
		featuresGrid: {
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
			gap: "32px",
		},
		featureCard: {
			position: "relative",
			padding: "32px",
			borderRadius: "16px",
			border: "1px solid rgba(255, 255, 255, 0.1)",
			backdropFilter: "blur(10px)",
			transition: "all 0.5s",
			cursor: "pointer",
		},
		featureIcon: {
			width: "64px",
			height: "64px",
			borderRadius: "16px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			marginBottom: "24px",
			transition: "transform 0.3s",
		},
		featureTitle: {
			fontSize: "20px",
			fontWeight: "bold",
			marginBottom: "16px",
			color: "white",
			transition: "color 0.3s",
		},
		featureDescription: {
			color: "#d1d5db",
			lineHeight: 1.6,
		},
		techSection: {
			position: "relative",
			zIndex: 10,
			padding: "80px 24px",
			maxWidth: "1280px",
			margin: "0 auto",
		},
		techGrid: {
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
			gap: "24px",
		},
		techCard: {
			background: "rgba(255, 255, 255, 0.05)",
			backdropFilter: "blur(10px)",
			borderRadius: "12px",
			padding: "16px",
			border: "1px solid rgba(255, 255, 255, 0.1)",
			textAlign: "center",
			transition: "all 0.3s",
		},
		techIcon: {
			width: "48px",
			height: "48px",
			background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
			borderRadius: "8px",
			margin: "0 auto 12px auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		ctaSection: {
			position: "relative",
			zIndex: 10,
			padding: "80px 24px",
			maxWidth: "800px",
			margin: "0 auto",
			textAlign: "center",
		},
		ctaCard: {
			background:
				"linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
			backdropFilter: "blur(10px)",
			borderRadius: "24px",
			padding: "48px",
			border: "1px solid rgba(255, 255, 255, 0.1)",
		},
		ctaTitle: {
			fontSize: "36px",
			fontWeight: "bold",
			marginBottom: "24px",
		},
		ctaSubtitle: {
			fontSize: "20px",
			color: "#d1d5db",
			marginBottom: "32px",
		},
		ctaButtons: {
			display: "flex",
			gap: "16px",
			justifyContent: "center",
			flexWrap: "wrap",
		},
		footer: {
			position: "relative",
			zIndex: 10,
			padding: "48px 24px",
			background: "rgba(0, 0, 0, 0.2)",
			backdropFilter: "blur(10px)",
			borderTop: "1px solid rgba(255, 255, 255, 0.1)",
		},
		footerContent: {
			maxWidth: "1280px",
			margin: "0 auto",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			flexWrap: "wrap",
			gap: "16px",
		},
	};

	return (
		<div style={styles.container}>
			{/* CSS Animations */}
			<style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes ping {
          0% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.1); }
          100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
        }
        .nav-link:hover { color: #06b6d4 !important; }
        .cta-button:hover { transform: scale(1.05); box-shadow: 0 8px 25px rgba(6, 182, 212, 0.4); }
        .primary-button:hover { transform: scale(1.05); box-shadow: 0 15px 35px rgba(6, 182, 212, 0.4); }
        .secondary-button:hover { background: rgba(255, 255, 255, 0.1); }
        .stat-card:hover { background: rgba(255, 255, 255, 0.1); transform: translateY(-5px); }
        .feature-card:hover .feature-icon { transform: scale(1.1); }
        .feature-card:hover .feature-title { color: #06b6d4; }
        .tech-card:hover { background: rgba(255, 255, 255, 0.1); transform: translateY(-5px); }
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem !important; }
          .nav-links { display: none; }
          .hero-buttons { flex-direction: column; }
        }
      `}</style>

			{/* Animated Background Elements */}
			<div style={styles.backgroundElements}>
				<div style={styles.bgCircle1}></div>
				<div style={styles.bgCircle2}></div>
				<div style={styles.bgCircle3}></div>
			</div>

			{/* Navigation */}
			<nav style={styles.nav}>
				<div style={styles.navContent}>
					<div style={styles.logo}>
						<div style={styles.logoIcon}>
							<Shield size={24} color="white" />
						</div>
						<span style={styles.logoText}>GovSecAI</span>
					</div>
					<div style={styles.navLinks} className="nav-links">
						<a href="#features" style={styles.navLink} className="nav-link">
							Features
						</a>
						<a href="#about" style={styles.navLink} className="nav-link">
							About
						</a>
						<Link
							to="/register"
							style={styles.ctaButton}
							className="cta-button"
						>
							Get Started
						</Link>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section style={styles.hero}>
				<div style={styles.heroContent}>
					<h1 style={styles.heroTitle} className="hero-title">
						<span style={styles.heroTitleGradient}>Intelligent</span>
						<br />
						<span>e-Governance</span>
					</h1>
					<p style={styles.heroSubtitle}>
						AI-powered risk detection, policy simulation, and secure
						transparency for modern government operations. Detect fraud early,
						analyze citizen sentiment, and optimize policies with machine
						learning.
					</p>

					<div style={styles.heroButtons} className="hero-buttons">
						<button style={styles.primaryButton} className="primary-button">
							<Play size={20} />
							Watch Demo
							<ChevronRight size={20} />
						</button>
						<button style={styles.secondaryButton} className="secondary-button">
							Learn More
						</button>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section style={styles.statsSection}>
				<div style={styles.statsGrid}>
					{stats.map((stat, index) => (
						<div key={index} style={styles.statCard} className="stat-card">
							<div style={styles.statValue}>{stat.value}</div>
							<div
								style={{
									color: "#d1d5db",
									fontSize: "14px",
									marginBottom: "4px",
								}}
							>
								{stat.description}
							</div>
							<div style={{ fontWeight: "600" }}>{stat.label}</div>
						</div>
					))}
				</div>
			</section>

			{/* Features Section */}
			<section id="features" style={styles.featuresSection}>
				<div style={styles.sectionTitle}>
					<h2 style={styles.sectionTitleText}>Powerful Features</h2>
					<p style={styles.sectionSubtitle}>
						Comprehensive AI-driven modules designed to transform government
						operations and enhance citizen trust
					</p>
				</div>

				<div style={styles.featuresGrid}>
					{features.map((feature, index) => (
						<div
							key={index}
							style={{
								...styles.featureCard,
								background:
									activeFeature === index
										? "rgba(255, 255, 255, 0.1)"
										: "rgba(255, 255, 255, 0.05)",
								transform: activeFeature === index ? "scale(1.02)" : "scale(1)",
								boxShadow:
									activeFeature === index
										? "0 20px 40px rgba(0, 0, 0, 0.3)"
										: "none",
							}}
							className="feature-card"
							onMouseEnter={() => setActiveFeature(index)}
						>
							<div
								style={{ ...styles.featureIcon, background: feature.color }}
								className="feature-icon"
							>
								{feature.icon}
							</div>
							<h3 style={styles.featureTitle} className="feature-title">
								{feature.title}
							</h3>
							<p style={styles.featureDescription}>{feature.description}</p>
							<div
								style={{
									position: "absolute",
									top: "16px",
									right: "16px",
									opacity: activeFeature === index ? 1 : 0,
									transition: "opacity 0.3s",
								}}
							>
								<ChevronRight size={20} color="#06b6d4" />
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Footer */}
			<footer style={styles.footer}>
				<div style={styles.footerContent}>
					<div style={styles.logo}>
						<div style={{ ...styles.logoIcon, width: "32px", height: "32px" }}>
							<Shield size={20} color="white" />
						</div>
						<span style={{ ...styles.logoText, fontSize: "20px" }}>
							GovSecAI
						</span>
					</div>
					<div style={{ color: "#9ca3af", fontSize: "14px" }}>
						© 2024 GovSecAI. Empowering transparent governance through AI.
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Home;
