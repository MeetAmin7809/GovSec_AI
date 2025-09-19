import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	Shield,
	User,
	Building,
	Eye,
	EyeOff,
	Mail,
	Lock,
	Phone,
	MapPin,
	ChevronDown,
	ArrowLeft,
	CheckCircle,
} from "lucide-react";

const Register = () => {
	const [userType, setUserType] = useState("citizen");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		department: "",
		designation: "",
		city: "",
		state: "",
		agreeTerms: false,
	});
	const [errors, setErrors] = useState({});

	const states = [
		"Andhra Pradesh",
		"Arunachal Pradesh",
		"Assam",
		"Bihar",
		"Chhattisgarh",
		"Goa",
		"Gujarat",
		"Haryana",
		"Himachal Pradesh",
		"Jharkhand",
		"Karnataka",
		"Kerala",
		"Madhya Pradesh",
		"Maharashtra",
		"Manipur",
		"Meghalaya",
		"Mizoram",
		"Nagaland",
		"Odisha",
		"Punjab",
		"Rajasthan",
		"Sikkim",
		"Tamil Nadu",
		"Telangana",
		"Tripura",
		"Uttar Pradesh",
		"Uttarakhand",
		"West Bengal",
	];

	const departments = [
		"Revenue Department",
		"Police Department",
		"Health Department",
		"Education Department",
		"Public Works Department",
		"Agriculture Department",
		"Transport Department",
		"Urban Development",
		"Rural Development",
		"Information Technology",
		"Finance Department",
		"Other",
	];

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

		if (!formData.firstName.trim())
			newErrors.firstName = "First name is required";
		if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}
		if (!formData.phone.trim()) {
			newErrors.phone = "Phone number is required";
		} else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
			newErrors.phone = "Please enter a valid 10-digit phone number";
		}
		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		}
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}
		if (!formData.city.trim()) newErrors.city = "City is required";
		if (!formData.state) newErrors.state = "State is required";

		if (userType === "admin") {
			if (!formData.department) newErrors.department = "Department is required";
			if (!formData.designation.trim())
				newErrors.designation = "Designation is required";
		}

		if (!formData.agreeTerms)
			newErrors.agreeTerms = "You must agree to the terms and conditions";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = () => {
		if (validateForm()) {
			console.log("Form submitted:", formData);
			// Here you would typically send the data to your backend
			alert("Registration successful!");
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
			padding: "20px 24px 40px 24px",
			minHeight: "calc(100vh - 80px)",
		},
		formCard: {
			background: "rgba(255, 255, 255, 0.05)",
			backdropFilter: "blur(20px)",
			borderRadius: "20px",
			border: "1px solid rgba(255, 255, 255, 0.1)",
			padding: "40px",
			maxWidth: "500px",
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
		formGrid: {
			display: "grid",
			gridTemplateColumns: "1fr 1fr",
			gap: "20px",
			marginBottom: "20px",
		},
		formGroup: {
			marginBottom: "20px",
		},
		formGroupFull: {
			gridColumn: "1 / -1",
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
			padding: "12px 16px",
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
		select: {
			width: "100%",
			padding: "12px 16px",
			background: "rgba(255, 255, 255, 0.05)",
			border: "1px solid rgba(255, 255, 255, 0.2)",
			borderRadius: "8px",
			color: "white",
			fontSize: "14px",
			outline: "none",
			transition: "all 0.3s",
			boxSizing: "border-box",
			appearance: "none",
			backgroundImage:
				"url(\"data:image/svg+xml;charset=UTF-8,<svg fill='%23d1d5db' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>\")",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "right 12px center",
			backgroundSize: "20px",
		},
		error: {
			color: "#ef4444",
			fontSize: "12px",
			marginTop: "4px",
		},
		checkboxGroup: {
			display: "flex",
			alignItems: "flex-start",
			gap: "12px",
			marginBottom: "32px",
		},
		checkbox: {
			marginTop: "2px",
		},
		checkboxLabel: {
			fontSize: "14px",
			color: "#d1d5db",
			lineHeight: 1.5,
			cursor: "pointer",
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
		},
		loginLink: {
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
	};

	return (
		<div style={styles.container}>
			<style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        .back-button:hover { color: #0891b2 !important; }
        .submit-button:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 15px 35px rgba(6, 182, 212, 0.4) !important; 
        }
        .input:focus { 
          border-color: #06b6d4 !important; 
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1) !important; 
        }
        .select:focus { 
          border-color: #06b6d4 !important; 
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1) !important; 
        }
        .link:hover { color: #0891b2 !important; }
        
        @media (max-width: 640px) {
          .form-card { padding: 24px !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .title { font-size: 24px !important; }
        }
        
        .input option {
          background: #1f2937;
          color: white;
        }
        .select option {
          background: #1f2937;
          color: white;
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
					<h1 style={styles.title}>Create Account</h1>
					<p style={styles.subtitle}>
						Join GovSecAI to access intelligent e-governance solutions
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

					<div>
						<div style={styles.formGrid} className="form-grid">
							{/* First Name */}
							<div style={styles.formGroup}>
								<label style={styles.label}>First Name *</label>
								<div style={styles.inputWrapper}>
									<input
										type="text"
										name="firstName"
										value={formData.firstName}
										onChange={handleInputChange}
										style={{
											...styles.input,
											...(errors.firstName ? styles.inputError : {}),
										}}
										className="input"
										placeholder="Enter first name"
									/>
									<User size={16} style={styles.inputIcon} />
								</div>
								{errors.firstName && (
									<div style={styles.error}>{errors.firstName}</div>
								)}
							</div>

							{/* Last Name */}
							<div style={styles.formGroup}>
								<label style={styles.label}>Last Name *</label>
								<div style={styles.inputWrapper}>
									<input
										type="text"
										name="lastName"
										value={formData.lastName}
										onChange={handleInputChange}
										style={{
											...styles.input,
											...(errors.lastName ? styles.inputError : {}),
										}}
										className="input"
										placeholder="Enter last name"
									/>
									<User size={16} style={styles.inputIcon} />
								</div>
								{errors.lastName && (
									<div style={styles.error}>{errors.lastName}</div>
								)}
							</div>
						</div>

						{/* Email */}
						<div style={styles.formGroup}>
							<label style={styles.label}>Email Address *</label>
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
									placeholder="Enter email address"
								/>
								<Mail size={16} style={styles.inputIcon} />
							</div>
							{errors.email && <div style={styles.error}>{errors.email}</div>}
						</div>

						{/* Phone */}
						<div style={styles.formGroup}>
							<label style={styles.label}>Phone Number *</label>
							<div style={styles.inputWrapper}>
								<input
									type="tel"
									name="phone"
									value={formData.phone}
									onChange={handleInputChange}
									style={{
										...styles.input,
										...(errors.phone ? styles.inputError : {}),
									}}
									className="input"
									placeholder="Enter phone number"
								/>
								<Phone size={16} style={styles.inputIcon} />
							</div>
							{errors.phone && <div style={styles.error}>{errors.phone}</div>}
						</div>

						<div style={styles.formGrid} className="form-grid">
							{/* City */}
							<div style={styles.formGroup}>
								<label style={styles.label}>City *</label>
								<div style={styles.inputWrapper}>
									<input
										type="text"
										name="city"
										value={formData.city}
										onChange={handleInputChange}
										style={{
											...styles.input,
											...(errors.city ? styles.inputError : {}),
										}}
										className="input"
										placeholder="Enter city"
									/>
									<MapPin size={16} style={styles.inputIcon} />
								</div>
								{errors.city && <div style={styles.error}>{errors.city}</div>}
							</div>

							{/* State */}
							<div style={styles.formGroup}>
								<label style={styles.label}>State *</label>
								<select
									name="state"
									value={formData.state}
									onChange={handleInputChange}
									style={{
										...styles.select,
										...(errors.state ? styles.inputError : {}),
									}}
									className="select"
								>
									<option value="">Select State</option>
									{states.map((state) => (
										<option key={state} value={state}>
											{state}
										</option>
									))}
								</select>
								{errors.state && <div style={styles.error}>{errors.state}</div>}
							</div>
						</div>

						{/* Admin-specific fields */}
						{userType === "admin" && (
							<>
								<div style={styles.formGrid} className="form-grid">
									{/* Department */}
									<div style={styles.formGroup}>
										<label style={styles.label}>Department *</label>
										<select
											name="department"
											value={formData.department}
											onChange={handleInputChange}
											style={{
												...styles.select,
												...(errors.department ? styles.inputError : {}),
											}}
											className="select"
										>
											<option value="">Select Department</option>
											{departments.map((dept) => (
												<option key={dept} value={dept}>
													{dept}
												</option>
											))}
										</select>
										{errors.department && (
											<div style={styles.error}>{errors.department}</div>
										)}
									</div>

									{/* Designation */}
									<div style={styles.formGroup}>
										<label style={styles.label}>Designation *</label>
										<div style={styles.inputWrapper}>
											<input
												type="text"
												name="designation"
												value={formData.designation}
												onChange={handleInputChange}
												style={{
													...styles.input,
													...(errors.designation ? styles.inputError : {}),
												}}
												className="input"
												placeholder="Enter designation"
											/>
											<Building size={16} style={styles.inputIcon} />
										</div>
										{errors.designation && (
											<div style={styles.error}>{errors.designation}</div>
										)}
									</div>
								</div>
							</>
						)}

						<div style={styles.formGrid} className="form-grid">
							{/* Password */}
							<div style={styles.formGroup}>
								<label style={styles.label}>Password *</label>
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
										placeholder="Enter password"
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

							{/* Confirm Password */}
							<div style={styles.formGroup}>
								<label style={styles.label}>Confirm Password *</label>
								<div style={styles.inputWrapper}>
									<input
										type={showConfirmPassword ? "text" : "password"}
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleInputChange}
										style={{
											...styles.input,
											...(errors.confirmPassword ? styles.inputError : {}),
										}}
										className="input"
										placeholder="Confirm password"
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										style={{
											...styles.inputIcon,
											background: "none",
											border: "none",
											cursor: "pointer",
											padding: 0,
										}}
									>
										{showConfirmPassword ? (
											<EyeOff size={16} />
										) : (
											<Eye size={16} />
										)}
									</button>
								</div>
								{errors.confirmPassword && (
									<div style={styles.error}>{errors.confirmPassword}</div>
								)}
							</div>
						</div>

						{/* Terms and Conditions */}
						<div style={styles.checkboxGroup}>
							<input
								type="checkbox"
								id="agreeTerms"
								name="agreeTerms"
								checked={formData.agreeTerms}
								onChange={handleInputChange}
								style={styles.checkbox}
							/>
							<label htmlFor="agreeTerms" style={styles.checkboxLabel}>
								I agree to the{" "}
								<a href="#" style={styles.link} className="link">
									Terms of Service
								</a>{" "}
								and{" "}
								<a href="#" style={styles.link} className="link">
									Privacy Policy
								</a>
							</label>
						</div>
						{errors.agreeTerms && (
							<div style={styles.error}>{errors.agreeTerms}</div>
						)}

						{/* Submit Button */}
						<button
							type="button"
							onClick={handleSubmit}
							style={styles.submitButton}
							className="submit-button"
						>
							Create Account
						</button>

						{/* Login Link */}
						<div style={styles.loginLink}>
							Already have an account?{" "}
							<Link to="/signin" style={styles.link} className="link">
								Sign in
							</Link>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Register;
