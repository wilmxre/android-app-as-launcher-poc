package com.loopeliemptywithkiosk;

import android.app.Activity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class PermissionModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

    PermissionModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "PermissionModule";
    }

    @ReactMethod
    public void requestCoarseLocation(Promise promise) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity != null) {
            PermissionUtils.requestCoarseLocation(currentActivity);
            promise.resolve("Request sent");
        } else {
            promise.reject("Activity doesn't exist");
        }
    }

    @ReactMethod
    public void checkSelfPermission(String permission, Promise promise) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity != null) {
            boolean result = PermissionUtils.checkSelfPermission(currentActivity, permission);
            promise.resolve(result);
        } else {
            promise.reject("Activity doesn't exist");
        }
    }
}
