# GP_ArgoCD
install npm 
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
    sudo yum install -y nodejs
verify
    node -v
    npm -v
--------------------------
inside NodeJs app >> npm install
docker build -t nodejsapp_v:1.1 . 
aws configure
aws eks update-kubeconfig --region us-east-1 --name gitops-gp-eks-cluster
-----------------------------------------------------------------------------------------------------------
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 576607007321.dkr.ecr.us-east-1.amazonaws.com
-----------------------------------------------------------------------------------------------------------
docker tag nodejsapp_v:1.1 576607007321.dkr.ecr.us-east-1.amazonaws.com/gitops-gp-ecr:1.1
-----------------------------------------------------------------------------------------------------------
docker push 576607007321.dkr.ecr.us-east-1.amazonaws.com/gitops-gp-ecr:1.1
-----------------------------------------------------------------------------------------------------------
ArgoCD...
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update
kubectl create namespace argocd
helm install argocd argo/argo-cd --namespace argocd
kubectl get pods -n argocd
kubectl port-forward service/argocd-server -n argocd 8080:443
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
---------------------------------------------------------------------------------------------------
Make new repo >> push basic files for test
