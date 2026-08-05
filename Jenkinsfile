pipeline {

    agent any

    environment {
        IMAGE_NAME = "joblinker-backend"
        IMAGE_TAG = "${BUILD_NUMBER}"
        GIT_REPO = "https://github.com/Smitbhuva15/JobLinker.git"
        GIT_BRANCH = "main"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: "${GIT_BRANCH}",
                    url: "${GIT_REPO}"
            }
        }

        stage('Build Docker Image') {

            steps {

                dir('backend') {

                    withCredentials([
                        usernamePassword(
                            credentialsId: 'dockerhub-creds',
                            usernameVariable: 'DOCKER_USER',
                            passwordVariable: 'DOCKER_PASS'
                        )
                    ]) {

                        sh '''
                        docker build \
                        -t $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG .
                        '''

                    }

                }

            }

        }

        stage('Push Docker Image') {

            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                    docker push $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG

                    docker logout
                    '''

                }

            }

        }

        stage('Update Kubernetes Deployment') {

            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                    sed -i "s|IMAGE_NAME|$DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG|g" k8s/deployment.yaml
                    '''

                }

            }

        }

        stage('Deploy to Amazon EKS') {

            steps {

                sh '''
                kubectl apply -f k8s/deployment.yaml

                kubectl apply -f k8s/service.yaml

                kubectl rollout status deployment/joblinker-backend
                '''

            }

        }

    }

    post {

        success {
            echo "Application deployed successfully."
        }

        failure {
            echo "Application deployment failed."
        }

    }

}