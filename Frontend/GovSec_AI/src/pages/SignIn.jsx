import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	Shield,
	Eye,
	EyeOff,
	Mail,
	Lock,
	ArrowLeft,
	User,
	Building,
} from "lucide-react";

const SignIn = () => {
	const [userType, setUserType] = useState("citizen");
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (validateForm()) {
			setIsLoading(true);
			console.log("Login submitted:", { ...formData, userType });

			// Simulate API call
			setTimeout(() => {
				setIsLoading(false);
				alert("Login successful!");
				// Here you would typically redirect or handle successful login
			}, 1500);
		}
	};

	const styles = {
		container: {
			minHeight: "100vh",
			background: "linear-gradient(135deg, #0f172a, #581c87, #0f172a)",
			color: "white",
			fontFamily: "system-ui, -apple-system, sans-serif",
			position: "relative",
			overflow: "hidden",
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
			top: "-100px",
			right: "-100px",
			width: "200px",
			height: "200px",
			background: "rgba(139, 92, 246, 0.1)",
			borderRadius: "50%",
			filter: "blur(60px)",
			animation: "pulse 4s infinite",
		},
		bgCircle2: {
			position: "absolute",
			bottom: "-100px",
			left: "-100px",
			width: "200px",
			height: "200px",
			background: "rgba(59, 130, 246, 0.1)",
			borderRadius: "50%",
			filter: "blur(60px)",
			animation: "pulse 4s infinite 1s",
		},
		header: {
			position: "relative",
			zIndex: 10,
			padding: "20px 24px",
			display: "flex",
			alignItems: "center",
			gap: "16px",
		},
		backButton: {
			display: "flex",
			alignItems: "center",
			gap: "8px",
			color: "#06b6d4",
			textDecoration: "none",
			fontSize: "14px",
			fontWeight: "500",
			transition: "color 0.3s",
			cursor: "pointer",
		},
		logo: {
			display: "flex",
			alignItems: "center",
			gap: "12px",
			marginLeft: "auto",
		},
		logoIcon: {
			width: "32px",
			height: "32px",
			background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
			borderRadius: "8px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		logoText: {
			fontSize: "20px",
			fontWeight: "bold",
			background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
			WebkitBackgroundClip: "text",
			WebkitTextFillColor: "transparent",
			backgroundClip: "text",
		},
		main: {
			position: "relative",
			zIndex: 10,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			padding: "20px 24px",
			minHeight: "calc(100vh - 80px)",
		},
		formCard: {
			background: "rgba(255, 255, 255, 0.05)",
			backdropFilter: "blur(20px)",
			borderRadius: "20px",
			border: "1px solid rgba(255, 255, 255, 0.1)",
			padding: "40px",
			maxWidth: "450px",
			width: "100%",
			height: "fit-content",
		},
		title: {
			fontSize: "32px",
			fontWeight: "bold",
			textAlign: "center",
			marginBottom: "8px",
			background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
			WebkitBackgroundClip: "text",
			WebkitTextFillColor: "transparent",
			backgroundClip: "text",
		},
		subtitle: {
			color: "#d1d5db",
			textAlign: "center",
			marginBottom: "32px",
			fontSize: "16px",
		},
		userTypeToggle: {
			display: "flex",
			marginBottom: "32px",
			background: "rgba(255, 255, 255, 0.05)",
			borderRadius: "12px",
			padding: "4px",
		},
		userTypeButton: {
			flex: 1,
			padding: "12px 16px",
			borderRadius: "8px",
			border: "none",
			background: "transparent",
			color: "#d1d5db",
			fontSize: "14px",
			fontWeight: "500",
			cursor: "pointer",
			transition: "all 0.3s",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			gap: "8px",
		},
		userTypeButtonActive: {
			background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
			color: "white",
			transform: "scale(1.02)",
		},
		formGroup: {
			marginBottom: "20px",
		},
		label: {
			display: "block",
			marginBottom: "8px",
			fontSize: "14px",
			fontWeight: "500",
			color: "#e5e7eb",
		},
		inputWrapper: {
			position: "relative",
		},
		input: {
			width: "100%",
			padding: "14px 16px",
			paddingRight: "48px",
			background: "rgba(255, 255, 255, 0.05)",
			border: "1px solid rgba(255, 255, 255, 0.2)",
			borderRadius: "8px",
			color: "white",
			fontSize: "14px",
			outline: "none",
			transition: "all 0.3s",
			boxSizing: "border-box",
		},
		inputError: {
			borderColor: "#ef4444",
		},
		inputIcon: {
			position: "absolute",
			right: "12px",
			top: "50%",
			transform: "translateY(-50%)",
			color: "#9ca3af",
		},
		error: {
			color: "#ef4444",
			fontSize: "12px",
			marginTop: "4px",
		},
		checkboxGroup: {
			display: "flex",
			alignItems: "center",
			gap: "12px",
			marginBottom: "24px",
		},
		checkbox: {
			accentColor: "#06b6d4",
		},
		checkboxLabel: {
			fontSize: "14px",
			color: "#d1d5db",
			cursor: "pointer",
		},
		forgotPassword: {
			textAlign: "right",
			marginBottom: "24px",
		},
		forgotPasswordLink: {
			color: "#06b6d4",
			textDecoration: "none",
			fontSize: "14px",
			fontWeight: "500",
			transition: "color 0.3s",
		},
		submitButton: {
			width: "100%",
			padding: "16px",
			background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
			border: "none",
			borderRadius: "12px",
			color: "white",
			fontSize: "16px",
			fontWeight: "600",
			cursor: "pointer",
			transition: "all 0.3s",
			boxShadow: "0 10px 25px rgba(6, 182, 212, 0.3)",
			position: "relative",
			overflow: "hidden",
		},
		submitButtonLoading: {
			opacity: 0.8,
			cursor: "not-allowed",
		},
		spinner: {
			display: "inline-block",
			width: "16px",
			height: "16px",
			border: "2px solid transparent",
			borderTop: "2px solid white",
			borderRadius: "50%",
			animation: "spin 1s linear infinite",
			marginRight: "8px",
		},
		registerLink: {
			textAlign: "center",
			marginTop: "24px",
			fontSize: "14px",
			color: "#d1d5db",
		},
		link: {
			color: "#06b6d4",
			textDecoration: "none",
			fontWeight: "500",
		},
		divider: {
			display: "flex",
			alignItems: "center",
			margin: "24px 0",
			gap: "16px",
		},
		dividerLine: {
			flex: 1,
			height: "1px",
			background: "rgba(255, 255, 255, 0.2)",
		},
		dividerText: {
			fontSize: "14px",
			color: "#9ca3af",
		},
		demoCredentials: {
			background: "rgba(6, 182, 212, 0.1)",
			border: "1px solid rgba(6, 182, 212, 0.3)",
			borderRadius: "8px",
			padding: "12px",
			marginBottom: "20px",
		},
		demoTitle: {
			fontSize: "12px",
			fontWeight: "600",
			color: "#06b6d4",
			marginBottom: "4px",
		},
		demoText: {
			fontSize: "11px",
			color: "#d1d5db",
			lineHeight: 1.4,
		},
	};

	return (
		<div style={styles.container}>
			<style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .back-button:hover { color: #0891b2 !important; }
                .submit-button:hover:not(.loading) { 
                    transform: translateY(-2px); 
                    box-shadow: 0 15px 35px rgba(6, 182, 212, 0.4) !important; 
                }
                .input:focus { 
                    border-color: #06b6d4 !important; 
                    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1) !important; 
                }
                .link:hover { color: #0891b2 !important; }
                .forgot-password-link:hover { color: #0891b2 !important; }
                
                @media (max-width: 640px) {
                    .form-card { padding: 24px !important; }
                    .title { font-size: 24px !important; }
                }
            `}</style>

			{/* Background Elements */}
			<div style={styles.backgroundElements}>
				<div style={styles.bgCircle1}></div>
				<div style={styles.bgCircle2}></div>
			</div>

			{/* Header */}
			<header style={styles.header}>
				<Link to="/home" style={styles.backButton} className="back-button">
					<ArrowLeft size={16} />
					Back to Home
				</Link>
				<div style={styles.logo}>
					<div style={styles.logoIcon}>
						<Shield size={20} color="white" />
					</div>
					<span style={styles.logoText}>GovSecAI</span>
				</div>
			</header>

			{/* Main Content */}
			<main style={styles.main}>
				<div style={styles.formCard} className="form-card">
					<h1 style={styles.title}>Welcome Back</h1>
					<p style={styles.subtitle}>
						Sign in to access your GovSecAI dashboard
					</p>

					{/* User Type Toggle */}
					<div style={styles.userTypeToggle}>
						<button
							style={{
								...styles.userTypeButton,
								...(userType === "citizen" ? styles.userTypeButtonActive : {}),
							}}
							onClick={() => setUserType("citizen")}
						>
							<User size={16} />
							Citizen
						</button>
						<button
							style={{
								...styles.userTypeButton,
								...(userType === "admin" ? styles.userTypeButtonActive : {}),
							}}
							onClick={() => setUserType("admin")}
						>
							<Building size={16} />
							Government Official
						</button>
					</div>

					{/* Demo Credentials */}
					<div style={styles.demoCredentials}>
						<div style={styles.demoTitle}>Demo Credentials</div>
						<div style={styles.demoText}>
							<strong>Citizen:</strong> citizen@demo.com | password: demo123
							<br />
							<strong>Admin:</strong> admin@gov.in | password: admin123
						</div>
					</div>

					<div>
						{/* Email */}
						<div style={styles.formGroup}>
							<label style={styles.label}>Email Address</label>
							<div style={styles.inputWrapper}>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									style={{
										...styles.input,
										...(errors.email ? styles.inputError : {}),
									}}
									className="input"
									placeholder="Enter your email address"
								/>
								<Mail size={16} style={styles.inputIcon} />
							</div>
							{errors.email && <div style={styles.error}>{errors.email}</div>}
						</div>

						{/* Password */}
						<div style={styles.formGroup}>
							<label style={styles.label}>Password</label>
							<div style={styles.inputWrapper}>
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									style={{
										...styles.input,
										...(errors.password ? styles.inputError : {}),
									}}
									className="input"
									placeholder="Enter your password"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									style={{
										...styles.inputIcon,
										background: "none",
										border: "none",
										cursor: "pointer",
										padding: 0,
									}}
								>
									{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
								</button>
							</div>
							{errors.password && (
								<div style={styles.error}>{errors.password}</div>
							)}
						</div>

						{/* Remember Me and Forgot Password */}
						<div style={styles.checkboxGroup}>
							<input
								type="checkbox"
								id="rememberMe"
								name="rememberMe"
								checked={formData.rememberMe}
								onChange={handleInputChange}
								style={styles.checkbox}
							/>
							<label htmlFor="rememberMe" style={styles.checkboxLabel}>
								Remember me
							</label>
						</div>

						<div style={styles.forgotPassword}>
							<Link
								to="/forgot-password"
								style={styles.forgotPasswordLink}
								className="forgot-password-link"
							>
								Forgot password?
							</Link>
						</div>

						{/* Submit Button */}
						<button
							type="button"
							onClick={handleSubmit}
							disabled={isLoading}
							style={{
								...styles.submitButton,
								...(isLoading ? styles.submitButtonLoading : {}),
							}}
							className={`submit-button ${isLoading ? "loading" : ""}`}
						>
							{isLoading && <div style={styles.spinner}></div>}
							{isLoading ? "Signing In..." : "Sign In"}
						</button>

						{/* Divider */}
						<div style={styles.divider}>
							<div style={styles.dividerLine}></div>
							<span style={styles.dividerText}>or</span>
							<div style={styles.dividerLine}></div>
						</div>

						{/* Register Link */}
						<div style={styles.registerLink}>
							Don't have an account?{" "}
							<Link to="/register" style={styles.link} className="link">
								Create account
							</Link>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default SignIn;
