---
title: green-logs
description: This is a package for centralizing logs in different applications
---

This repository centralizes the logs by the systems, the package contains integration with Gray Log and can receive dynamic messages.


## FEATURES
  1. Send custom messages for GrayLog
  2. Logs information on method execution With Decorators
  


## INSTALL
  npm i green-logs


## USAGE

    let log = new GreenLogs(GrayLogHost)
    let message: LogOptions = {
      short_message: 'this is short message',
       full_message: 'this is full message'
       }

    
    log.emit(message)



