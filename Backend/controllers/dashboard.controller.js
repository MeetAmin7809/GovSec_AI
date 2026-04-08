const db = require("../config/sqlite.config.js");
const response = require("../utils/responseHandler.util.js");

class DashboardController {
	// --- STATS ---
	static getStats(req, res) {
		try {
			const roadCount = db.prepare("SELECT COUNT(*) as c FROM road_complaints").get().c;
			const healthCount = db.prepare("SELECT COUNT(*) as c FROM health_complaints").get().c;
			const fraudCount = db.prepare("SELECT COUNT(*) as c FROM banking_fraud").get().c;

			const counts = {
				road: roadCount,
				health: healthCount,
				fraud: fraudCount,
				total: roadCount + healthCount + fraudCount,
			};

			// Trends (distributed simulation like original)
			const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
			const rFactors = [0.15, 0.17, 0.16, 0.18, 0.16, 0.18];
			const hFactors = [0.16, 0.15, 0.18, 0.17, 0.16, 0.18];
			const fFactors = [0.17, 0.16, 0.15, 0.16, 0.18, 0.18];

			const rData = rFactors.map((f) => Math.floor(roadCount * f));
			const hData = hFactors.map((f) => Math.floor(healthCount * f));
			const fData = fFactors.map((f) => Math.floor(fraudCount * f));
			const totalData = rData.map((r, i) => r + hData[i] + fData[i]);

			// Alerts
			const alerts = [];

			const latestRoads = db
				.prepare("SELECT * FROM road_complaints ORDER BY id DESC LIMIT 10")
				.all();
			latestRoads.forEach((r) => {
				alerts.push({
					source: "Road",
					date: r.date_reported,
					sort_date: parseDateForSort(r.date_reported),
					description: r.description,
					city: r.city,
					id: r.id,
					evidence_url: r.evidence_url || null,
				});
			});

			const latestHealth = db
				.prepare("SELECT * FROM health_complaints ORDER BY id DESC LIMIT 10")
				.all();
			latestHealth.forEach((h) => {
				alerts.push({
					source: "Health",
					date: h.date_reported,
					sort_date: parseDateForSort(h.date_reported),
					description: h.complaint_text,
					city: h.city,
					id: h.id,
					evidence_url: h.evidence_url || null,
				});
			});

			const latestFraud = db
				.prepare("SELECT * FROM banking_fraud ORDER BY id DESC LIMIT 10")
				.all();
			latestFraud.forEach((f) => {
				alerts.push({
					source: "Fraud",
					date: f.timestamp ? f.timestamp.substring(0, 10) : "",
					sort_date: f.timestamp || "",
					description: f.merchant_category,
					city: f.location_city,
					id: f.id,
				});
			});

			alerts.sort((a, b) => (b.sort_date || "").localeCompare(a.sort_date || ""));
			const finalAlerts = alerts.slice(0, 10);

			return res.json({
				counts,
				trends: {
					labels,
					road: rData,
					health: hData,
					fraud: fData,
					total: totalData,
				},
				alerts: finalAlerts,
			});
		} catch (error) {
			console.error("Stats error:", error);
			return response(res, 500, null, "Error fetching stats");
		}
	}

	// --- ROAD ---
	static getRoadSummary(req, res) {
		try {
			const rows = db
				.prepare("SELECT city, COUNT(*) as count FROM road_complaints GROUP BY city")
				.all();
			const result = {};
			rows.forEach((r) => (result[r.city] = r.count));
			return res.json({ complaints_by_city: result });
		} catch (e) {
			return response(res, 500, null, "Error");
		}
	}

	static getRoadAreas(req, res) {
		try {
			const { city } = req.params;
			const rows = db
				.prepare(
					"SELECT area, COUNT(*) as count FROM road_complaints WHERE LOWER(city) = LOWER(?) GROUP BY area LIMIT 15"
				)
				.all(city);
			const result = {};
			rows.forEach((r) => (result[r.area] = r.count));
			return res.json({ area_counts: result });
		} catch (e) {
			return response(res, 500, null, "Error");
		}
	}

	static getRoadList(req, res) {
		try {
			const { city, area } = req.params;
			const rows = db
				.prepare("SELECT * FROM road_complaints WHERE city = ? AND area = ?")
				.all(city, area);
			return res.json(rows);
		} catch (e) {
			return response(res, 500, null, "Error");
		}
	}

	// --- HEALTH ---
	static getHealthSummary(req, res) {
		try {
			const rows = db
				.prepare("SELECT city, COUNT(*) as count FROM health_complaints GROUP BY city")
				.all();
			const result = {};
			rows.forEach((r) => (result[r.city] = r.count));
			return res.json({ complaints_by_city: result });
		} catch (e) {
			return response(res, 500, null, "Error");
		}
	}

	static getHealthAreas(req, res) {
		try {
			const { city } = req.params;
			const rows = db
				.prepare(
					"SELECT area, COUNT(*) as count FROM health_complaints WHERE LOWER(city) = LOWER(?) GROUP BY area LIMIT 15"
				)
				.all(city);
			const result = {};
			rows.forEach((r) => (result[r.area] = r.count));
			return res.json({ area_counts: result });
		} catch (e) {
			return response(res, 500, null, "Error");
		}
	}

	static getHealthList(req, res) {
		try {
			const { city, area } = req.params;
			const rows = db
				.prepare("SELECT * FROM health_complaints WHERE city = ? AND area = ?")
				.all(city, area);
			return res.json(rows);
		} catch (e) {
			return response(res, 500, null, "Error");
		}
	}

	// --- FRAUD ---
	static getFraudSummary(req, res) {
		try {
			const rows = db
				.prepare(
					"SELECT location_city, COUNT(*) as count FROM banking_fraud GROUP BY location_city"
				)
				.all();
			const result = {};
			rows.forEach((r) => (result[r.location_city] = r.count));
			return res.json({ fraud_by_city: result });
		} catch (e) {
			return response(res, 500, null, "Error");
		}
	}

	static getFraudAreas(req, res) {
		try {
			const { city } = req.params;
			const rows = db
				.prepare(
					"SELECT area, COUNT(*) as count FROM banking_fraud WHERE LOWER(location_city) = LOWER(?) GROUP BY area LIMIT 15"
				)
				.all(city);
			const result = {};
			rows.forEach((r) => (result[r.area] = r.count));
			return res.json({ area_counts: result });
		} catch (e) {
			return response(res, 500, null, "Error");
		}
	}

	static getFraudList(req, res) {
		try {
			const { city, area } = req.params;
			const rows = db
				.prepare(
					"SELECT * FROM banking_fraud WHERE location_city = ? AND area = ?"
				)
				.all(city, area);
			return res.json(rows);
		} catch (e) {
			return response(res, 500, null, "Error");
		}
	}

	// --- GENERIC AREA STATUS (works for all modules) ---
	static getAreaStatus(req, res) {
		try {
			const { module, city, area } = req.params;
			const tableMap = {
				road: { table: "road_complaints", cityCol: "city" },
				health: { table: "health_complaints", cityCol: "city" },
				fraud: { table: "banking_fraud", cityCol: "location_city" },
			};
			const cfg = tableMap[module];
			if (!cfg) return response(res, 400, null, "Invalid module");

			const row = db
				.prepare(
					`SELECT area_status FROM ${cfg.table} WHERE LOWER(${cfg.cityCol}) = LOWER(?) AND LOWER(area) = LOWER(?) LIMIT 1`
				)
				.get(city, area);
			return res.json({ status: row ? row.area_status : "Pending" });
		} catch (e) {
			return response(res, 500, null, "Error");
		}
	}

	static updateAreaStatus(req, res) {
		try {
			const { module, city, area } = req.params;
			const { status } = req.body;
			const tableMap = {
				road: { table: "road_complaints", cityCol: "city" },
				health: { table: "health_complaints", cityCol: "city" },
				fraud: { table: "banking_fraud", cityCol: "location_city" },
			};
			const cfg = tableMap[module];
			if (!cfg) return response(res, 400, null, "Invalid module");

			db.prepare(
				`UPDATE ${cfg.table} SET area_status = ? WHERE LOWER(${cfg.cityCol}) = LOWER(?) AND LOWER(area) = LOWER(?)`
			).run(status, city, area);
			return res.json({ status: "updated" });
		} catch (e) {
			return response(res, 500, null, "Error updating status");
		}
	}

	static resolveArea(req, res) {
		try {
			const { module, city, area } = req.params;
			const tableMap = {
				road: { table: "road_complaints", cityCol: "city" },
				health: { table: "health_complaints", cityCol: "city" },
				fraud: { table: "banking_fraud", cityCol: "location_city" },
			};
			const cfg = tableMap[module];
			if (!cfg) return response(res, 400, null, "Invalid module");

			const result = db
				.prepare(
					`DELETE FROM ${cfg.table} WHERE LOWER(${cfg.cityCol}) = LOWER(?) AND LOWER(area) = LOWER(?)`
				)
				.run(city, area);
			return res.json({ status: "resolved", removed_count: result.changes });
		} catch (e) {
			return response(res, 500, null, "Error resolving");
		}
	}

	}

	// --- TRACK COMPLAINT ---
	static trackComplaint(req, res) {
		try {
			const { complaint_id } = req.params;

			const road = db
				.prepare("SELECT * FROM road_complaints WHERE complaint_id = ?")
				.get(complaint_id);
			if (road)
				return res.json({
					type: "Road",
					status: road.area_status || "pending",
					details: road,
				});

			const health = db
				.prepare("SELECT * FROM health_complaints WHERE complaint_id = ?")
				.get(complaint_id);
			if (health)
				return res.json({
					type: "Health",
					status: health.area_status || "pending",
					details: health,
				});

			const fraud = db
				.prepare("SELECT * FROM banking_fraud WHERE transaction_id = ?")
				.get(complaint_id);
			if (fraud)
				return res.json({
					type: "Banking",
					status: fraud.area_status || "pending",
					details: fraud,
				});

			return response(res, 404, null, "Complaint ID not found");
		} catch (e) {
			return response(res, 500, null, "Error tracking complaint");
		}
	}

	// --- CITIZEN SPECIFIC ---
	static getCitizenComplaints(req, res) {
		try {
			const { email } = req.params;
			if (!email) return response(res, 400, null, "Email is required");

			const road = db
				.prepare("SELECT *, 'Road' as source FROM road_complaints WHERE citizen_email = ?")
				.all(email);
			const health = db
				.prepare("SELECT *, 'Health' as source FROM health_complaints WHERE citizen_email = ?")
				.all(email);
			const fraud = db
				.prepare("SELECT *, 'Fraud' as source FROM banking_fraud WHERE citizen_email = ?")
				.all(email);

			const all = [...road, ...health, ...fraud].sort((a, b) => {
				const dateA = a.date_reported || a.timestamp || "";
				const dateB = b.date_reported || b.timestamp || "";
				return dateB.localeCompare(dateA);
			});

			return res.json(all);
		} catch (e) {
			console.error("Error fetching citizen complaints:", e);
			return response(res, 500, null, "Error fetching complaints");
		}
	}

	static fileComplaint(req, res) {
		try {
			const { module, city, area, description, citizen_email, evidence_url } = req.body;
			if (!module || !city || !area || !description || !citizen_email) {
				return response(res, 400, null, "Missing required fields");
			}

			const date = new Date().toLocaleDateString("en-GB").replace(/\//g, "-"); // DD-MM-YYYY
			const id = "C-" + Math.floor(Math.random() * 1000000);

			if (module === "road") {
				db.prepare(
					"INSERT INTO road_complaints (complaint_id, date_reported, city, area, description, status, priority, area_status, citizen_email, evidence_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
				).run(id, date, city, area, description, "Pending", "Medium", "Pending", citizen_email, evidence_url || null);
			} else if (module === "health") {
				db.prepare(
					"INSERT INTO health_complaints (complaint_id, date_reported, city, area, complaint_text, category, severity, area_status, citizen_email, evidence_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
				).run(id, date, city, area, description, "General", "Medium", "Pending", citizen_email, evidence_url || null);
			} else if (module === "fraud") {
				db.prepare(
					"INSERT INTO banking_fraud (transaction_id, timestamp, location_city, area, merchant_category, risk_score, is_fraud, area_status, citizen_email, evidence_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
				).run(id, new Date().toISOString(), city, area, description, 50, "Yes", "Pending", citizen_email, evidence_url || null);
			} else {
				return response(res, 400, null, "Invalid module");
			}

			return res.json({ status: "success", complaint_id: id });
		} catch (e) {
			console.error("Error filing complaint:", e);
			return response(res, 500, null, "Error filing complaint");
		}
	}

	// --- PING ---
	static ping(req, res) {
		return res.json({ status: "ok" });
	}
}

// Helper to normalize dates for sorting
function parseDateForSort(dateStr) {
	if (!dateStr) return "0000-00-00";
	try {
		if (dateStr.includes("T")) return dateStr;
		const parts = dateStr.split("-");
		if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
		return dateStr;
	} catch {
		return "0000-00-00";
	}
}

module.exports = DashboardController;
