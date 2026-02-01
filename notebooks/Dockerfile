FROM pytorch/pytorch:2.1.0-cuda11.8-cudnn8-runtime

# Set working directory
WORKDIR /workspace

COPY requirements.txt .

# Install Jupyter and other useful libs
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Expose port
EXPOSE 8888

# Start Jupyter lab
CMD ["jupyter", "lab", "--ip=0.0.0.0", "--allow-root", "--no-browser", "--NotebookApp.token=''", "--NotebookApp.password=''"]