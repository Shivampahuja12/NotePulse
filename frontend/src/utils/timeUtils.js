export function getCurrentISTTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  return `Today, ${timeStr}`;
}

export function formatNoteTime(note) {
  if (!note) return getCurrentISTTime();

  // 1. If note has createdAt timestamp (ISO string from Mongoose timestamps)
  if (note.createdAt) {
    const d = new Date(note.createdAt);
    if (!isNaN(d.getTime())) {
      const formatted = d.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      return `Today, ${formatted}`;
    }
  }

  const timeStr = note.time;
  if (!timeStr) return getCurrentISTTime();

  // 2. If timeStr is a standard date string or ISO timestamp
  if (timeStr.includes('/') || (timeStr.includes('T') && !isNaN(Date.parse(timeStr)))) {
    const d = new Date(timeStr);
    if (!isNaN(d.getTime())) {
      const formatted = d.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      return `Today, ${formatted}`;
    }
  }

  // 3. Handle legacy UTC formatted strings saved by Render server (e.g. "Today, 05:28 PM" when local time is ~10:58 PM)
  const matchToday = timeStr.match(/^Today,\s*(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (matchToday) {
    let [_, hoursStr, minsStr, ampm] = matchToday;
    let hours = parseInt(hoursStr, 10);
    const mins = parseInt(minsStr, 10);
    if (ampm.toUpperCase() === 'PM' && hours < 12) hours += 12;
    if (ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;

    // Check current IST hour
    const currentISTHour = parseInt(
      new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', hour12: false }),
      10
    );

    // If stored hour is around 5 hours behind current IST hour (e.g., stored 17 when IST is 22)
    const diff = (currentISTHour - (hours + 5.5 + 24) % 24);
    if (Math.abs(diff) <= 3 || Math.abs(diff) >= 21) {
      const totalMins = hours * 60 + mins + 330; // +330 mins = +5.5 hrs
      const istMins = (totalMins + 1440) % 1440;
      let istHours = Math.floor(istMins / 60);
      const finalMins = istMins % 60;

      const finalAmpm = istHours >= 12 ? 'PM' : 'AM';
      let displayHours = istHours % 12;
      if (displayHours === 0) displayHours = 12;
      const formattedMins = finalMins < 10 ? `0${finalMins}` : finalMins;
      const formattedHours = displayHours < 10 ? `0${displayHours}` : displayHours;
      return `Today, ${formattedHours}:${formattedMins} ${finalAmpm}`;
    }
  }

  return timeStr;
}
