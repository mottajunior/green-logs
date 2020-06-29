---
title: green-logs
description: This is a package for centralizing logs in different applications
---

This repository centralizes the logs by the systems, the package contains integration with Gray Log and can receive dynamic messages.


## FEATURES
  1. Send custom messages for GrayLog
  2. Logs information on method execution With Decorators (Shell && GrayLog)
  


## INSTALL
  npm i green-logs


## USAGE
     //Instance a Singleton in your application
     const log = new GreenLogs('127.0.0.1')
     
     //simple message
     log.emit({short_message: 'this is short message'})
     
     //more Complex Message
     let msg : LogOptions = {
        short_message: 'short one',
        full_message: 'full message',
        additionalColumns:{
            Title: 'this is Title',
            Description: 'Description fake'
        }
     }
     
     log.emit(msg)
  
  
    //Decorators (need instance of GreenLogs to use url host)
    
    @LogApplication
    function someFunction(){
      do something...
    }
    
    @LogGrayLog
    function someFunction(){
      do something...
    }
    
    



    



