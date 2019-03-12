package com.awesomeproject

import android.graphics.Rect
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import com.facebook.react.uimanager.util.ReactFindViewUtil

class CustomVisibilityInspectorModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    private var view: View? = null

    init {
        ReactFindViewUtil.addViewListener(object: ReactFindViewUtil.OnViewFoundListener {
            override fun getNativeId() = "visibilityInspect"

            override fun onViewFound(view: View?) {
                this@CustomVisibilityInspectorModule.view = view
            }
        })
    }

    override fun getName() = "CustomVisibilityInspector"

    @ReactMethod fun inspect(promise: Promise) {
        var description = "Not found"

        this.view?.let {
            description = describeVisibility()
        }
        promise.resolve(description)
    }

    private fun describeVisibility(): String {
        val sb = StringBuilder(1024)
        describeVisibility(this.view!!, sb)
        return sb.toString()
    }

    private fun describeVisibility(view: View, sb: StringBuilder) {
        if (view !is ViewGroup) {
            if (isVisible(view)) {
                sb.append(describeView(view)).append(", ")
            }
        } else {
            for (i in 1..view.childCount) {
                describeVisibility(view.getChildAt(i - 1), sb)
            }
        }
    }

    private fun isVisible(view: View) = view.getGlobalVisibleRect(Rect())
    private fun describeView(view: View) = if (view is TextView) view.text else view.javaClass.simpleName
}

class CustomVisibilityInspectorPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext) = listOf(CustomVisibilityInspectorModule(reactContext))
    override fun createViewManagers(reactContext: ReactApplicationContext) = emptyList<ViewManager<View, ReactShadowNode<*>>>()
}
