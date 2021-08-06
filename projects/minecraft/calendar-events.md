---
title: "Calendar Events"
date: 2021-05-04
spigot: 35536
github: https://github.com/NiklasEi/CalendarEvents
tags:
- Minecraft
---

Configure dates and times to trigger custom events. Events can be scheduled on certain dates, or repeated every year, month or any day of the week. All configuration can be done inside `config.yml`.

```yaml
  workingDays:
    timing:
      occasion: "monday, tuesday, wednesday, thursday, friday"
      time: "03:00,05:00,07:00,09:00,11:00,13:00,15:00,17:00,19:00,21:00,23:00,01:00"
```

The label of this event would be 'workingDays'. It will be called on every specified day and time.

There is an API to easily add or remove events from other Bukkit plugins at runtime. You can find an <a href="https://github.com/NiklasEi/EggsampleCalendarEventsAPI" target="_blank">example project using the API on GitHub</a>.
