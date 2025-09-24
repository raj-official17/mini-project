const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 5000;
const fetchAlerts = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    const latestAlertFromDB = data[0]; // Get the most recent alert from the server
    const latestAlertFromState = alerts[0]; // Get the most recent alert from the current state

    // Check if the new alert is different from the one we already have
    if (latestAlertFromDB && (!latestAlertFromState || latestAlertFromDB.id !== latestAlertFromState.id)) {
        if (isAudioEnabled) {
            playAlertSound();
        }
    }
    
    setAlerts(data); // Always update the state with the latest data

  } catch (error) {
    console.error('Error fetching alerts:', error);
  }
};

app.use(cors());
app.use(bodyParser.json());

const DB_FILE = './alerts.json';
const ARCHIVE_FILE = './archive_alerts.json';

if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

app.post('/api/alert', (req, res) => {
    const alert = req.body;
    console.log('Received new alert:', alert);

    if (!alert.device_id || !alert.lat || !alert.lon || !alert.timestamp) {
        return res.status(400).send('Missing required data.');
    }

    let alerts = JSON.parse(fs.readFileSync(DB_FILE));
    alerts.unshift(alert);
    fs.writeFileSync(DB_FILE, JSON.stringify(alerts, null, 2));

    res.status(200).send('Alert received and recorded.');
});

app.get('/api/alerts', (req, res) => {
    let alerts = JSON.parse(fs.readFileSync(DB_FILE));
    res.json(alerts);
});

const cleanupOldAlerts = () => {
    try {
        let alerts = JSON.parse(fs.readFileSync(DB_FILE));
        const oneHourAgo = new Date(Date.now() - 3600 * 1000);

        const recentAlerts = alerts.filter(alert => new Date(alert.timestamp) > oneHourAgo);
        const archivedAlerts = alerts.filter(alert => new Date(alert.timestamp) <= oneHourAgo);

        if (archivedAlerts.length > 0) {
            // Read existing archive, add new alerts, and save
            let existingArchive = JSON.parse(fs.readFileSync(ARCHIVE_FILE));
            const updatedArchive = [...existingArchive, ...archivedAlerts];
            fs.writeFileSync(ARCHIVE_FILE, JSON.stringify(updatedArchive, null, 2));
            console.log(`Archived ${archivedAlerts.length} old alerts.`);
        }

        if (recentAlerts.length !== alerts.length) {
            fs.writeFileSync(DB_FILE, JSON.stringify(recentAlerts, null, 2));
            console.log(`Cleaned up ${alerts.length - recentAlerts.length} old alerts.`);
        }
    } catch (error) {
        console.error('Failed to run cleanup:', error);
    }
};

app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
    
    setInterval(cleanupOldAlerts, 5 * 60 * 1000);
    if (!fs.existsSync(ARCHIVE_FILE)) {
  fs.writeFileSync(ARCHIVE_FILE, JSON.stringify([]));
}
});