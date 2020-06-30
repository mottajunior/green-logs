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
     //Instance a Singleton in your application and exported for everyone who needs.
     export const log = new GreenLogs('127.0.0.1')              
     
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
  
  
    
    //Decorators (log method name, and return informations in shell or gray log)
    
    @LogApplication
    function someFunction(){
      do something...
    }
    
    //(need instance of GreenLogs to use setted gray log host.)
    @LogGrayLog
    function someFunction(){
      do something...
    }
    
    



    



