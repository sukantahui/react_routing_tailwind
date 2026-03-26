package com.example.tags;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;
import java.io.IOException;

public class RepeatTag extends SimpleTagSupport {
    private int times;

    public void setTimes(int times) {
        this.times = times;
    }

    @Override
    public void doTag() throws JspException, IOException {
        for (int i = 0; i < times; i++) {
            // Invoke the body content once per iteration
            getJspBody().invoke(null);
        }
    }
}
