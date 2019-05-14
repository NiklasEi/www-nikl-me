---
layout: page
type: minecraft
title: Calendar Events
spigot: 35536
source: https://github.com/NiklasEi/CalendarEvents
description: Configure dates and times at which a custom event is called.
---

In the configuration file you can name and specify events, for example:

```yaml
  workingDays:
    timing:
      occasion: "monday, tuesday, wednesday, thursday, friday"
      time: "03:00,05:00,07:00,09:00,11:00,13:00,15:00,17:00,19:00,21:00,23:00,01:00"
```

The label of this event would be 'workingDays'. It will be called on every specified day and time.

There is an API to easily add or remove events during runtime. You can find an <a href="https://github.com/NiklasEi/EggsampleCalendarEventsAPI" target="_blank">example project using the API on GitHub</a>.
